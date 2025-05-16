import { colors } from '@src/styles/colors'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Times } from 'react-native-unicons'
import Text from '../Text'
import Button from '../Button'
import { navigation } from '@src/utils'
import { openSettings } from 'react-native-permissions'
import { paddings } from '@src/styles/paddings'

interface CameraNoPermissionProps {
	messageTx?: string
}
export const CameraNoPermission: FC<CameraNoPermissionProps> = (props) => {

	const { messageTx = "QR_code_accept_permission" } = props
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

export const styles = StyleSheet.create({
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
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
