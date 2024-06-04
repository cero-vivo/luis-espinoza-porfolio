"use client"

import { Paragraph } from '@/components/basic/paragraph/paragraph'
import React from 'react'
import styles from "./header.module.css"
import { Sections } from '@/types/constant'
import { useLandingStore } from '@/model/landing-store'

export const Header = () => {

	const { links, actionSection, setActionSection, openContactModal } = useLandingStore()

	const goToHome = () => setActionSection(Sections.HOME)

	const sections = links.map((link) => {

		const isSelected = actionSection === link.sectionId

		const onClick = () => {
			if (link.sectionId === Sections.CONTACT) openContactModal()
			else setActionSection(link.sectionId as Sections)
		}

		return link.sectionId === "cv" ?
			<a key={link.sectionId} href={`${link.downloadLink}`} download={link.downloadLink} className={`${styles.option}`}>
				<Paragraph text={link.text} variant="bold" classes={`${isSelected ? styles.activeSection : undefined} ${styles.option}`} />
			</a>
			:
			<a key={link.sectionId} href={`#${link.sectionId}`} onClick={onClick} className={`${styles.option}`}>
				<Paragraph text={link.text} variant="bold" classes={`${isSelected ? styles.activeSection : undefined} ${styles.option}`} />
			</a>

	})

	return (
		<header className={styles.headerBox}>
			{sections}
			<a href={`#${Sections.HOME}`} onClick={goToHome} className={styles.headerPhoto}>
				<img src='/images/header_photo1.png' alt="header_photo" className={styles.headerPhoto} />
			</a>
		</header>
	)
}
