"use client"

import React from 'react'
import { EmailIcon } from '@/components/basic/icons/email-icon'
import { WhatsappIcon } from '@/components/basic/icons/whatsapp-icon'
import { PhoneIcon } from '@/components/basic/icons/phone-icon'
import ExternalLinkIcon from '@/components/basic/icons/external-link-icon'
import { SvgIconProps } from '@/components/basic/icons/icons.types'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { useContactActions } from '@/model/landing-store'
import { useTranslations } from 'next-intl'
import styles from "./footer.module.css"

type ContactChip = {
	id: string
	label: string
	helper: string
	Icon: React.ComponentType<SvgIconProps>
	action: () => void
}

export const Footer = () => {
	const { sendMeEmail, callMe, sendMeWhatsapp, openLinkedin, openContactModal } = useContactActions()
	const tContact = useTranslations('contact')
	const tFooter = useTranslations('footer')
	const contactChips: ContactChip[] = [
		{
			id: 'email',
			label: tFooter('email_short'),
			helper: tContact('my_email'),
			Icon: EmailIcon,
			action: sendMeEmail,
		},
		{
			id: 'whatsapp',
			label: 'WhatsApp',
			helper: tFooter('message'),
			Icon: WhatsappIcon,
			action: sendMeWhatsapp,
		},
		{
			id: 'phone',
			label: tFooter('call'),
			helper: tContact('my_phone_number'),
			Icon: PhoneIcon,
			action: callMe,
		},
		{
			id: 'linkedin',
			label: tContact('linkedin_label'),
			helper: tFooter('profile'),
			Icon: ExternalLinkIcon,
			action: openLinkedin,
		},
	]

	return (
		<footer className={styles.footer}>
			<div className={styles.backdrop} aria-hidden='true' />
			<div className={styles.content}>
				<div className={styles.identity}>
					<span className={styles.badge}>{tFooter('badge')}</span>
					<h2 className={styles.title}>{tFooter('title')}</h2>
					<p className={styles.tagline}>{tFooter('tagline')}</p>
				</div>
				<div className={styles.ctaCard}>
					<span className={styles.ctaLabel}>{tFooter('ctaLabel')}</span>
					<h3 className={styles.ctaTitle}>{tFooter('ctaTitle')}</h3>
					<p className={styles.ctaDescription}>{tFooter('ctaDescription')}</p>
					<button type='button' className={styles.ctaButton} onClick={openContactModal}>
						{tFooter('ctaButton')}
					</button>
				</div>
				<div className={styles.meta}>
					<span className={styles.metaLabel}>{tFooter('availabilityLabel')}</span>
					<span className={styles.metaValue}>{tFooter('availabilityValue')}</span>
				</div>
			</div>
			<div className={styles.ribbon}>
				{contactChips.map(({ id, label, helper, Icon, action }) => (
					<button key={id} type='button' className={styles.chip} onClick={action}>
						<span className={styles.chipIcon} aria-hidden='true'>
							<Icon color='currentColor' width={22} height={22} />
						</span>
						<span className={styles.chipText}>
							<span className={styles.chipLabel}>{label}</span>
							<span className={styles.chipHelper}>{helper}</span>
						</span>
					</button>
				))}
			</div>
			<div className={styles.bottomBar}>
				<Paragraph
					variant='regular'
					text={`© ${new Date().getFullYear()} ${tFooter('title')}. ${tFooter('copy')}`}
					classes={styles.copy}
				/>
			</div>
		</footer>
	)
}
