import { colors } from '@src/styles/colors';
import { paddings } from '@src/styles/paddings';
import { navigation, responsiveHeight, responsiveWidth } from '@src/utils';
import React, { FC, forwardRef, useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Bolt, BoltSlash } from 'react-native-unicons';
import { Code, Camera as VisionCamera } from 'react-native-vision-camera';
import Text from '../../Text';
import { useTranslation } from 'react-i18next';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCamera } from '../useCamera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OverlayLoading } from '../../OverlayLoading/OverlayLoading';
import { CameraNoPermission } from '../CameraNoPermission';
import { useFocusEffect } from '@react-navigation/native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';

interface CameraProps {
	processCode?: (codes: Code[]) => void
	showInfoModal?: boolean
	messageInfoModal?: string
	setLoadingCode?: (value: boolean) => void
	loadingCode?: boolean
	closeInfoModal?: () => void
}

export const QRCamera: FC<CameraProps> = forwardRef((props, ref) => {

	const { processCode, showInfoModal, messageInfoModal, loadingCode, setLoadingCode, closeInfoModal } = props

	const { camera, activePermission, onErrorCamera, toggleFlash, isFlashActive, codeScanner, cameraRef, focusCamera } = useCamera({ processCode, loadingCode, setLoadingCode, scanType: "QR" })

	const visionCameraRef = ref ? ref : cameraRef

	const [activeCamera, setActiveCamera] = useState(true)

	const { t } = useTranslation(["translation", "common", "forms"])

	const insets = useSafeAreaInsets()

	useFocusEffect(
		useCallback(() => {
			setActiveCamera(true)
			return () => { setActiveCamera(false) }
		}, [])
	);

	/// -----

	const [facing, setFacing] = useState<CameraType>('back');
	const [permission, requestPermission] = useCameraPermissions();



	return (
		<>
			{loadingCode && <OverlayLoading isLoading={loadingCode} brand={"PF"} />}
			<GestureHandlerRootView>
				<GestureDetector gesture={focusCamera}>
					<>
						{/* 	<VisionCamera
							//@ts-ignore
							ref={visionCameraRef}
							style={StyleSheet.absoluteFill}
							//@ts-ignore
							device={camera}
							onError={onErrorCamera}
							isActive={activeCamera}
							torch={isFlashActive ? "on" : "off"}
							codeScanner={codeScanner} /> */}

						<CameraView
							barcodeScannerSettings={{
								barcodeTypes: ["qr"],
							}}
							onBarcodeScanned={codeScanner}
							style={styles.camera}
							facing={facing}>
							{activePermission ?
								<>
									<View style={styles.firstSection} />
									<TouchableOpacity style={{
										position: 'absolute',
										top: insets.top,
										left: responsiveWidth(0.02),
										padding: 5
									}} onPress={() => navigation.goBack()}>
										<ArrowLeft
											width={40}
											height={40}
											color={colors.white}
										/>
									</TouchableOpacity>
									<Text type="h3" text={t('QR_code_place_qr_on_frame')} customStyle={styles.title} />
									<View style={styles.secondSection}>
										<View style={styles.leftItem} />
										<View style={styles.centerItem}>
											<View style={styles.squareScanner} />
										</View>
										<View style={styles.rightItem} />
									</View>
									<View style={styles.thirdSection} />
									<TouchableOpacity
										style={styles.iconFlashLightContainer}
										onPress={toggleFlash}>
										{isFlashActive ? (
											<Bolt width={30} height={30} color={colors.grey2} />
										) : (
											<BoltSlash width={30} height={30} color={colors.grey2} />
										)}
									</TouchableOpacity>
								</>
								:
								<CameraNoPermission />
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
				</GestureDetector>
			</GestureHandlerRootView>
		</>
	)
})



export const styles = StyleSheet.create({
	camera: {
		width: '100%',
		height: '100%',
	},
	firstSection: {
		flex: 0.37,
		width: '100%',
		backgroundColor: colors.greyOpaccity
	},
	title: {
		color: colors.white,
		width: '100%',
		fontSize: 20,
		textAlign: 'center',
		backgroundColor: colors.greyOpaccity,
		paddingBottom: 30
	},
	secondSection: {
		flex: 0.26,
		flexDirection: 'row',
	},
	leftItem: {
		backgroundColor: colors.greyOpaccity,
		flexGrow: 1
	},
	centerItem: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	squareScanner: {
		borderColor: colors.red,
		borderWidth: 2,
		width: responsiveWidth(0.5),
		height: responsiveHeight(0.24),
		position: "relative",
		zIndex: 2
	},
	rightItem: {
		backgroundColor: colors.greyOpaccity,
		flexGrow: 1
	},
	thirdSection: {
		flex: 0.38,
		width: '100%',
		backgroundColor: colors.greyOpaccity
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
	},
	//MessageError
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
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
	iconFlashLightContainer: {
		bottom: responsiveHeight(0.05),
		position: 'absolute',
		borderRadius: 150,
		backgroundColor: colors.white,
		width: 70,
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: "center"
	},
});

