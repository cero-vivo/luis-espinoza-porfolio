"use client"

import React from 'react'
import { EmailIcon } from '@/components/basic/icons/email-icon'
import { WhatsappIcon } from '@/components/basic/icons/whatsapp-icon'
import { PhoneIcon } from '@/components/basic/icons/phone-icon'
import ExternalLinkIcon from '@/components/basic/icons/external-link-icon'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { useLandingStore } from '@/model/landing-store'
import { useTranslations } from 'next-intl'
import styles from "./footer.module.css"

export const Footer = () => {

const { sendMeEmail, callMe, sendMeWhatsapp, openLinkedin } = useLandingStore()

	const t = useTranslations('contact')

	return (
		<footer className={styles.footer}>
			<div className={styles.iconRow}>
				<a className={styles.iconLink} onClick={sendMeEmail} href="#">
					<EmailIcon color="currentColor" /> {t('email_short')}
				</a>
				<a className={styles.iconLink} onClick={sendMeWhatsapp} href="#">
					<WhatsappIcon color="currentColor" /> WhatsApp
				</a>
				<a className={styles.iconLink} onClick={callMe} href="#">
					<PhoneIcon color="currentColor" /> {t('call')}
				</a>
				<a className={styles.iconLink} onClick={openLinkedin} href="#">
					<ExternalLinkIcon color="currentColor" width={20} height={20} /> LinkedIn
				</a>
			</div>
			<Paragraph variant='regular' text={`© ${new Date().getFullYear()}`} classes={styles.copy} />
		</footer>
	)
}
