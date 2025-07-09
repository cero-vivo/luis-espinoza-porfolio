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
			<article className={styles.modalCard}>
				<span className={styles.closeButton} onClick={closeContactModal}>
					<CloseIcon color={colors.navyBlue} width={28} height={28} />
				</span>
				<h2 className={styles.name}>Luis Espinoza</h2>
				<p className={styles.role}>Software Engineer</p>

				<div className={styles.contactList}>
					<button className={styles.contactButton} onClick={sendMeEmail}>
						<EmailIcon color={colors.navyBlue} width={28} height={28} />
						<span className={styles.contactLabel}>Email</span>
						<span className={styles.contactDetail}>luis.espinoza.nav@outlook.com</span>
					</button>
					<button className={styles.contactButton} onClick={sendMeWhatsapp}>
						<WhatsappIcon color={colors.navyBlue} width={28} height={28} />
						<span className={styles.contactLabel}>WhatsApp</span>
						<span className={styles.contactDetail}>+54 9 11 2388 1314</span>
					</button>
					<button className={styles.contactButton} onClick={callMe}>
						<PhoneIcon color={colors.navyBlue} width={28} height={28} />
						<span className={styles.contactLabel}>Llamar</span>
						<span className={styles.contactDetail}>+54 9 11 2388 1314</span>
					</button>
					<button className={styles.contactButton} onClick={openLinkedin}>
						<LinkedinIcon color={colors.navyBlue} width={28} height={28} />
						<span className={styles.contactLabel}>LinkedIn</span>
						<span className={styles.contactDetail}>/in/luis-espinoza</span>
					</button>
				</div>

			</article>
		</Modal>
	)
}
