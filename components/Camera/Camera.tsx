import { colors } from '@src/styles/colors';
import { paddings } from '@src/styles/paddings';
import { navigation, responsiveHeight, responsiveWidth } from '@src/utils';
import React, { FC, forwardRef, useCallback, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Times } from 'react-native-unicons';
import { Camera as VisionCamera, Code, Point, useCameraDevice, useCameraDevices, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import Text from '../Text';
import Button from '../Button';
import { openSettings } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';
import { TypeOptions } from 'i18next';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import analytics from "@react-native-firebase/analytics";
import { useCamera } from './useCamera';
import useIsMounted from '@src/hooks/useIsMounted';

interface DontHasPermissionProps {
	messageTx?: string
}

interface CameraProps {
	dontHasPermissionMessageTx?: string
	processCode?: (value: string) => void // for QR and Barcode
	children: React.ReactNode
}

const DontHasPermission: FC<DontHasPermissionProps> = (props) => {

	const { messageTx="QR_code_accept_permission"} = props
	const { t } = useTranslation(["translation", "common", "forms"])

	return (
		<View style={styles.header}>
			<View style={styles.meInfor}>
				<View style={styles.buttonCheck}>
					<View style={styles.buttonCheckError}>
						<Times
							stroke={colors.grey4}
							fill={colors.grey4}
							width={35}
							height={35}
							color={colors.grey4}
						/>
					</View>
				</View>
			</View>
			<View style={styles.viewTitleError}>
				<Text type="h3" align="center" text={t(messageTx as any)} />
			</View>
			<Text type="h3" text={t('activate_permissions')} onPress={() => openSettings()} color={colors.fuchsia} underline />
			<View style={styles.footer}>
				<Button
					title="Submit"
					onPress={() => navigation.goBack()}>
					<Text type="h3" text={t('common:finish')} />
				</Button>
			</View>
		</View>
	)
}

export const Camera: FC<CameraProps> = forwardRef((props, ref) => {

	const { dontHasPermissionMessageTx, processCode, children } = props

	const {activePermission, onErrorCamera, toggleFlash, isFlashActive } = useCamera({processCode})

	const cameraRef = ref ? ref : useRef<VisionCamera>(null)
	const isMount = useIsMounted()



	const focus = useCallback((point: Point) => {
		//@ts-ignore
		const c = cameraRef?.current
		if (c == null) return
		c.focus(point)
	}, [])

	const gesture = Gesture.Tap().onEnd(({ x, y }) => { runOnJS(focus)({ x, y }) })

	const device = useCameraDevice('back')
	const { hasPermission, requestPermission } = useCameraPermission()

	return (
		<GestureHandlerRootView>
			<GestureDetector gesture={gesture}>
				<VisionCamera
					//@ts-ignore
					ref={cameraRef}
					style={StyleSheet.absoluteFill}
					//@ts-ignore
					device={device}
					onError={onErrorCamera}
					isActive={isMount()}
					torch={isFlashActive ? "on" : "off"}
					codeScanner={codeScanner}>
					{hasPermission ?
						children 
						:
						<DontHasPermission messageTx={dontHasPermissionMessageTx}/>
					}
				</VisionCamera>
			</GestureDetector>
		</GestureHandlerRootView>
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
		position: "absolute"
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
});

