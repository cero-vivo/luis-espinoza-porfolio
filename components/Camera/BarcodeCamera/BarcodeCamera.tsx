import * as React from 'react';
import { Dimensions, Platform, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { Camera, Point, runAtTargetFps, useCameraDevice, useCameraFormat, useFrameProcessor, type Orientation } from 'react-native-vision-camera';
/* import { zxing, type Result } from 'vision-camera-zxing'; */
import { Worklets } from 'react-native-worklets-core';
import { Polygon, Svg, Text as SVGText } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@src/styles/colors';
import { paddings } from '@src/styles/paddings';
import { navigation, responsiveHeight, responsiveWidth } from '@src/utils';
import { useCamera } from '../useCamera';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { ArrowUp, Bolt, BoltSlash } from 'react-native-unicons';
import Text from '../../Text';
import { routes } from '@src/constants';
import analytics from "@react-native-firebase/analytics";
import ModalError from '@src/components/CustomModal/ModalError';
import { CameraNoPermission } from '../CameraNoPermission';
import { CameraType, CameraView } from 'expo-camera';

interface props {
	onScanned: (result: /* Result */any[]) => void;
	showInfoModal?: boolean
	messageInfoModal?: string
	setLoadingCode?: (value: boolean) => void
	loadingCode?: boolean
	closeInfoModal?: () => void
	isSecondScanEnabled?: boolean
	scanCode?: any
	scanResponse?: any
}

export const BarcodeCamera: React.FC<props> = React.forwardRef((props, ref) => {

	const { onScanned, showInfoModal, messageInfoModal, loadingCode, setLoadingCode, closeInfoModal, isSecondScanEnabled, scanCode, scanResponse } = props

	const { camera, activePermission, onErrorCamera, toggleFlash, isFlashActive, codeScanner, cameraRef, focusCamera } = useCamera({ processCode: (code: any) => onScanned(code), countScanner: true, scanType: "BARCODE" })

	const visionCameraRef = ref ? ref : cameraRef

	const [activeCamera, setActiveCamera] = React.useState(true)

	const { t } = useTranslation(["translation", "common", "forms"])

	useFocusEffect(
		React.useCallback(() => {
			setActiveCamera(true)
			return () => { setActiveCamera(false) }
		}, [])
	)

	const [torchEnabled, setTorchEnabled] = React.useState(false);
	const [hasPermission, setHasPermission] = React.useState(false);
	const [isActive, setIsActive] = React.useState(false);
	const [viewBox, setViewBox] = React.useState("0 0 720 1280");
	const [barcodeResults, setBarcodeResults] = React.useState([] as /* Result */any[]);
	const [facing, setFacing] = React.useState<CameraType>('back');

/* 	const cameraFormat = useCameraFormat(device, [
		{ videoResolution: { width: 1280, height: 720 } },
		{ fps: 60 }
	]); */

	const convertAndSetResults = (results: Record<string, object>, frameWidth: number, frameHeight: number, orientation: Orientation) => {
		const keys = Object.keys(results);
		setViewBox(`0 0 ${frameWidth} ${frameHeight}`);
		const converted: /* Result */any[] = keys.map(key => results[key] as /* Result */any);
		setBarcodeResults(converted);

	};

	const convertAndSetResultsJS = Worklets.createRunOnJS(convertAndSetResults);

	React.useEffect(() => {
		if (onScanned && barcodeResults.length > 0) {
			onScanned(barcodeResults)
		}
	}, [barcodeResults]);

	const frameProcessor = useFrameProcessor(frame => {
		'worklet';
		runAtTargetFps(10, () => {
			'worklet';
			const results = ""//zxing(frame, { multiple: true });
			if (results) {
				convertAndSetResultsJS(results as Record<string, object>, frame.width, frame.height, frame.orientation);
			}
		});
	}, []);

	React.useEffect(() => {
		(async () => {
			const status = await Camera.requestCameraPermission();
			setHasPermission(status === 'granted');
			setIsActive(true);
		})();
	}, []);


	return (
		<SafeAreaView>
			{hasPermission && (
				<>
					{/* <Camera
						style={StyleSheet.absoluteFill}
						device={device}
						isActive={isActive}
						format={cameraFormat}
						frameProcessor={frameProcessor}
						torch={isFlashActive ? "on" : "off"} */}
					<CameraView
						barcodeScannerSettings={{
							barcodeTypes: ['aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a']
						}}
						onBarcodeScanned={/* codeScanner */(e) => JSON.stringify(e)}
						style={styles.camera}
						facing={facing}>
						{activePermission ?
							<>
								<View style={styles.viewRowsContainer}>
									<View style={styles.leftColumnMainContainer}>
										<View>
											<TouchableOpacity
												style={styles.button}
												onPress={() => {
													navigation.navigate(routes.REGISTER_BARCODE_MANUALY, { second: isSecondScanEnabled, data: scanResponse, scanCode: scanCode });
													analytics().logEvent('pagar_servicios_ingreso_codigo', {});
												}}>
												<Text
													color={colors.white}
													text={t('register_bar_code_enter')}
													type={'h5'}
												/>
											</TouchableOpacity>

											{showInfoModal && (
												<View
													style={{
														transform: [{ rotate: '90deg' }],
														width: responsiveWidth(0.8),
														position: 'absolute',
														right: responsiveHeight(0.12),
														top: responsiveWidth(0.1),
													}}>
													<ModalError onPressAction={closeInfoModal} text={messageInfoModal || ""}
													/>
												</View>
											)}
										</View>

										<TouchableOpacity
											style={styles.iconFlashLightContainer}
											onPress={toggleFlash}>
											{isFlashActive ? (
												<Bolt width={30} height={30} color={colors.grey2} />
											) : (
												<BoltSlash width={30} height={30} color={colors.grey2} />
											)}
										</TouchableOpacity>

									</View>
									<View style={styles.viewCenterRow}>
										<View style={styles.viewTransparentBar}>
											<View style={styles.redLine} />
										</View>
									</View>

									<View />
									<View style={styles.rightRowContainer}>
										<TouchableOpacity style={{
											position: 'absolute',
											top: Platform.OS === 'android' ? responsiveWidth(0.01) : responsiveWidth(0.09),
											right: responsiveWidth(0.02),
											padding: 5
										}} onPress={() => navigation.goBack()}>
											<ArrowUp
												width={40}
												height={40}
												color={colors.white}
											/>
										</TouchableOpacity>
										<View style={styles.viewTitleScanContainer}>
											<Text
												type={'h3'}
												color={colors.white}
												align={'center'}
												text={t(isSecondScanEnabled ? "register_bar_code_intructions_opt_2" : "register_bar_code_intructions_opt_1")}
											/>
										</View>
									</View>
								</View>
							</>
							:
							<CameraNoPermission messageTx='register_bar_code_permissions_error' />
						}
					</CameraView>
					{showInfoModal &&
						<TouchableOpacity
							style={styles.viewModalContainer}
							onPress={closeInfoModal}>
							<Text type="global" text={messageInfoModal} color={colors.white} align={'center'} />
						</TouchableOpacity>
					}
				</>
			)}
		</SafeAreaView >
	);
})
export const styles = StyleSheet.create({
	camera: {
		width: '100%',
		height: '100%',
		backgroundColor: colors.greyOpaccity,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		backgroundColor: colors.secondary,
		padding: paddings[24],
		borderRadius: 8,
		width: responsiveWidth(0.8),
		justifyContent: 'center',
		alignItems: 'center',
		transform: [{ rotate: '90deg' }],
	},
	viewRowsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	leftColumnMainContainer: {
		width: responsiveWidth(0.35),
		height: responsiveHeight(1),
		backgroundColor: colors.greyOpaccity,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconFlashLightContainer: {
		transform: [{ rotate: '90deg' }],
		bottom: responsiveHeight(0.03),
		position: 'absolute',
		borderRadius: 150,
		backgroundColor: colors.white,
		width: 70,
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewCenterRow: {
		height: responsiveHeight(1),
		paddingVertical: paddings[32],
		borderBottomWidth: responsiveHeight(0.05),
		borderColor: colors.greyOpaccity,
		borderTopWidth: responsiveHeight(0.05),
	},
	viewTransparentBar: {
		height: responsiveHeight(0.9),
		backgroundColor: 'transparent',
		width: responsiveWidth(0.3),
	},
	redLine: {
		borderWidth: 2,
		flexDirection: 'column',
		alignSelf: 'center',
		height: responsiveHeight(0.83),
		borderColor: colors.red,
	},
	rightRowContainer: {
		width: responsiveWidth(0.35),
		height: responsiveHeight(1),
		backgroundColor: colors.greyOpaccity,
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewTitleScanContainer: {
		paddingHorizontal: 20,
		transform: [{ rotate: '90deg' }],
		width: responsiveHeight(0.8),
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	body: {
		flex: 1,
		paddingHorizontal: 40,
	},
	description: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	meInfor: {
		height: 100,
		width: 100,
		backgroundColor: colors.grey4,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
	},
	viewTitleError: {
		paddingVertical: 34,
		paddingHorizontal: 30,
	},
	titleError: {
		fontSize: 20,
	},
	buttonCheck: {
		borderRadius: 6,
		padding: 2,
	},
	buttonCheckError: {
		backgroundColor: colors.accent3,
		borderRadius: 6,
		padding: 2,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: paddings[40],
		paddingVertical: paddings[24]
	},
	viewModalContainer: {
		backgroundColor: colors.black,
		borderRadius: 8,
		width: '90%',
		justifyContent: 'center',
		alignSelf: 'center',
		bottom: 20,
		padding: 8,
		flexDirection: 'row',
		alignItems: 'center',
		// height: 100,
		marginBottom: 20,
		textAlign: 'center',
		position: "absolute",
		zIndex: 20
	}
});