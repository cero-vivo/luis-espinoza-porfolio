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
import Image from 'next/image'

export const ContactModal = () => {

	const { contactModalVisible, closeContactModal, sendMeEmail, sendMeWhatsapp, callMe, openLinkedin } = useLandingStore()

	return (
		<Modal isOpen={contactModalVisible}>
			<section className={styles.contactBox}>
				<CloseIcon color={colors.navyBlue} width={30} height={30} onClick={closeContactModal} classes={styles.closeIcon} />
				<Image width={800} height={600} src={"/images/contact_modal.jpg"} alt="contact_modal" className={styles.image} />
				<div className={styles.imageOverlay} />
				<div className={styles.contactInfo}>
					<h2 className={styles.name}>Luis Espinoza</h2>
					<p className={styles.role}>Software Engineer</p>
					<p className={styles.detail}>📧 <a href="mailto:luis.espinoza.nav@outlook.com">luis.espinoza.nav@outlook.com</a></p>
					<p className={styles.detail}>📞 <a href="tel:+5491123881314">Tel +54 9 11 2388 1314</a></p>
					<p className={styles.detail}>💬 <a href="https://wa.me/5491123881314" target="_blank" rel="noopener noreferrer">WhatsApp +54 9 11 2388 1314</a></p>
					<p className={styles.detail}>🔗 <a href="https://www.linkedin.com/in/luisespinozadev/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
					<p className={styles.location}>📍<a href="https://www.google.com/maps/place/Palermo,+CABA,+Argentina" target="_blank" rel="noopener noreferrer">Palermo, Ciudad Autónoma de Buenos Aires, Argentina</a></p>

					<div className={styles.contactIconsBox}>
						<EmailIcon color={colors.navyBlue} width={50} height={50} onClick={sendMeEmail} classes={styles.contactIcon} />
						<WhatsappIcon color={colors.navyBlue} width={50} height={50} onClick={sendMeWhatsapp} classes={styles.contactIcon} />
						<PhoneIcon color={colors.navyBlue} width={50} height={50} onClick={callMe} classes={styles.contactIcon} />
						<LinkedinIcon color={colors.navyBlue} width={50} height={50} onClick={openLinkedin} classes={styles.contactIcon} />
					</div>
				</div>
			</section>
		</Modal>
	)
}
