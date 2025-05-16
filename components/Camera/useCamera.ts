import { useAppDispatch, useAppSelector } from '@src/hooks/useState';
import { increaseBarcodeCounter, resetBarcodeCounter, setBarcodeCounter } from '@src/modules/payService/store/services';
import { BarcodeScanningResult } from 'expo-camera';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native';
import { Point } from 'react-native-camera';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Code, useCameraDevice, useCameraPermission, useCodeScanner, Camera } from 'react-native-vision-camera';


interface CameraProps {
	processCode?: (codes: Code[]) => void
	onError?: (e: any) => void
	loadingCode?: boolean
	setLoadingCode?: (value: boolean) => void
	countScanner?: boolean
	scanType?: 'QR' | "BARCODE"
}

export const MAX_COUNT_TO_SCAN = Platform.OS === "ios" ? 30 : 4

export const useCamera = (props: CameraProps) => {

	const { processCode, onError, setLoadingCode, loadingCode, countScanner=false, scanType } = props

	const { hasPermission, requestPermission } = useCameraPermission()
	const camera = useCameraDevice('back')

	const cameraRef =useRef<Camera>(null)

	const [activePermission, setActivePermission] = useState(false);
	const [isFlashActive, setIsFlashActive] = useState(false);
	const barcodeReadingsCounter = useAppSelector(state => state.services?.barcodeReadingsCounter)
	const dispatch = useAppDispatch();


	useEffect(() => {
		if (!hasPermission) {
			const reqPermission = async () => {
				try {
					const result = await requestPermission();
					setActivePermission(result)
				} catch (error) {
					setActivePermission(false);
				}
			}
			reqPermission()
		} else setActivePermission(true)
	}, [])

	const onErrorCamera = (e: any) => {
		onError?.(e)
	}

	const toggleFlash = () => setIsFlashActive(prev => !prev)

	useEffect(() => {
		dispatch(resetBarcodeCounter(""))
		return  () => { dispatch(resetBarcodeCounter("")) }
	}, [])


	const codeScanner = (codes: any) => {
		if (loadingCode) return
		if(setLoadingCode) setLoadingCode(true)
		if (processCode) processCode?.(codes?.data)
	}/* useCodeScanner({
		codeTypes: scanType === "QR" ? ['qr'] : Platform.OS === "ios" ? ['itf'] : ['itf'],
		onCodeScanned: (codes: Code[]) => {
			//This is a workaround to avoid countless scans
			if(countScanner) { // we count to 30 to be sure to scan 2 codes if needed
				if(codes?.length === 2 && barcodeReadingsCounter < MAX_COUNT_TO_SCAN) {
					dispatch(setBarcodeCounter(MAX_COUNT_TO_SCAN))
					console.log("Entrando a seteo automatico, se han detectado 2 codigos")
				}
				else dispatch(increaseBarcodeCounter(""))
			}
			if (loadingCode) return
			if(setLoadingCode) setLoadingCode(true)
			if (processCode) processCode?.(codes)
		}
	})
 */

	//This is used to focus the camera with a tap on the screen
	const focus = useCallback((point: Point) => {
		//@ts-ignore
		const c = cameraRef?.current
		if (c == null) return
		c.focus(point)
	}, [])

	const focusCamera = Gesture.Tap().onEnd(({ x, y }) => { runOnJS(focus)({ x, y }) })


	return {
		camera,
		activePermission,
		onErrorCamera,
		isFlashActive,
		toggleFlash,
		codeScanner,
		cameraRef,
		focusCamera
	}
}
