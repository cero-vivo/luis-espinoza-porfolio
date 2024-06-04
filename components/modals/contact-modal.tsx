"use client"

import { useLandingStore } from '@/model/landing-store'
import React from 'react'
import styles from "./contact-modal.module.css"
import { Modal } from '../basic/modal/modal'
import { CloseIcon } from '../basic/icons/close-icon'
import { colors } from '@/theme/colors'


export const ContactModal = () => {

	const { contactModalVisible, openContactModal, closeContactModal } = useLandingStore()
	
	return (
		<Modal isOpen={contactModalVisible}>
			<section className={styles.contactBox}>
				<CloseIcon color={colors.navyBlue} width={30} height={30} onClick={closeContactModal} classes={styles.closeIcon} />
				<img src={"/images/contact_modal.jpg"} alt="contact_modal" className={styles.image} />
				<div className={styles.imageOverlay} />
			</section>
		</Modal>
	)
}
