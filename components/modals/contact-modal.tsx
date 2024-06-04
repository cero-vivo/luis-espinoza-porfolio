"use client"

import { useLandingStore } from '@/model/landing-store'
import React from 'react'
import styles from "./contact-modal.module.css"
import { Modal } from '../basic/modal/modal'
import { CloseIcon } from '../basic/icons/close-icon'
import { colors } from '@/theme/colors'
import { EmailIcon } from '../basic/icons/email-icon'
import { WhatsappIcon } from '../basic/icons/whatsapp-icon'
import { PhoneIcon } from '../basic/icons/phone-icon'
import { LinkedinIcon } from '../basic/icons/linkedin-icon'

export const ContactModal = () => {

	const { contactModalVisible, closeContactModal, sendMeEmail, sendMeWhatsapp, callMe, openLinkedin } = useLandingStore()

	return (
		<Modal isOpen={contactModalVisible}>
			<section className={styles.contactBox}>
				<CloseIcon color={colors.navyBlue} width={30} height={30} onClick={closeContactModal} classes={styles.closeIcon} />
				<img src={"/images/contact_modal.jpg"} alt="contact_modal" className={styles.image} />
				<div className={styles.imageOverlay} />
				<div className={styles.contactIconsBox}>
					<EmailIcon color={colors.navyBlue} width={90} height={90} onClick={sendMeEmail} classes={styles.contactIcon} />
					<WhatsappIcon color={colors.navyBlue} width={90} height={90} onClick={sendMeWhatsapp} classes={styles.contactIcon} />
					<PhoneIcon color={colors.navyBlue} width={90} height={90} onClick={callMe} classes={styles.contactIcon} />
					<LinkedinIcon color={colors.navyBlue} width={90} height={90} onClick={openLinkedin} classes={styles.contactIcon} />
				</div>
			</section>
		</Modal>
	)
}
