"use client"

import React from 'react'
import { EmailIcon } from '@/components/basic/icons/email-icon'
import { useLandingStore } from '@/model/landing-store'
import { colors } from '@/theme/colors'
import styles from "./footer.module.css"
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { WhatsappIcon } from '@/components/basic/icons/whatsapp-icon'
import { PhoneIcon } from '@/components/basic/icons/phone-icon'
import { LinkedinIcon } from '@/components/basic/icons/linkedin-icon'
import ExternalLinkIcon from '@/components/basic/icons/external-link-icon'

export const Footer = () => {

const { sendMeEmail, callMe, sendMeWhatsapp, openLinkedin } = useLandingStore()

	return (
		<footer className={styles.footer}>
			<span className={styles.infoRow}>
				<EmailIcon color={colors.white} width={20} height={20} onClick={sendMeEmail} classes={styles.contactIcon} />
				<Paragraph variant='regular' text={"my_email"} classes={styles.text} onClick={sendMeEmail}/>
			</span>
			<span className={styles.infoRow}>
				<WhatsappIcon color={colors.white} width={20} height={20} onClick={sendMeWhatsapp} classes={styles.contactIcon} />
				<PhoneIcon color={colors.white} width={20} height={20} onClick={callMe} classes={styles.contactIcon} />
				<Paragraph variant='regular' text={"my_phone_number"} classes={styles.text} onClick={callMe} />
			</span>
			<span className={styles.infoRow} onClick={openLinkedin}>
				<Paragraph variant='regular' text={"linkedin_label"} classes={styles.text} />
				<ExternalLinkIcon color={colors.white} width={14} height={14} onClick={openLinkedin} classes={styles.contactIcon} />
			</span>
			<Paragraph variant='regular' customTx={new Date()?.getFullYear()?.toString()} classes={styles.date} />
		</footer>
	)
}
