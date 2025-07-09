"use client"

import { Paragraph } from '@/components/basic/paragraph/paragraph'
import React, { useState, useEffect, useRef } from 'react'
import styles from "./header.module.css"
import { Sections } from '@/types/constant'
import { useLandingStore } from '@/model/landing-store'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export const Header = () => {

	const { links, actionSection, setActionSection, openContactModal } = useLandingStore()

	const t = useTranslations("header")

	const goToHome = () => setActionSection(Sections.HOME)

	const sections = links.map((link) => {

		const isSelected = actionSection === link.sectionId

		const onClick = () => {
			if (link.sectionId === Sections.CONTACT) openContactModal()
			else setActionSection(link.sectionId as Sections)
		}

		if (link.sectionId === "cv") {
			const [open, setOpen] = useState(false)
			const wrapperRef = useRef<HTMLSpanElement | null>(null)

			useEffect(() => {
				const handleClickOutside = (e: MouseEvent) => {
					if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
						setOpen(false)
					}
				}
				document.addEventListener('click', handleClickOutside)
				return () => document.removeEventListener('click', handleClickOutside)
			}, [])

			const locale = useLocale()
			const cvPath = locale === 'en' ? '/cv/CV-LuisEspinoza-EN.pdf' : '/cv/CV-LuisEspinoza.pdf'

			return (
				<span key={link.sectionId} className={styles.cvWrapper} ref={wrapperRef}>
					<span onClick={() => setOpen(v => !v)} className={`${styles.option}`}> 
						<Paragraph text={t(link.text)} variant="bold" classes={`${isSelected ? styles.activeSection : undefined} ${styles.option}`} />
					</span>
					<div className={`${styles.cvDropdown} ${open ? styles.cvDropdownOpen : ''}`}>
						<a href={cvPath} download={cvPath} className={styles.cvLink}>{t('download_cv', {defaultMessage:'Descargar CV'})}</a>
					</div>
				</span>
			)
		}
		return link.sectionId === "cv" ? null :
			<a key={link.sectionId} href={`#${link.sectionId}`} onClick={onClick} className={`${styles.option}`}>
				<Paragraph text={t(link.text)} variant="bold" classes={`${isSelected ? styles.activeSection : undefined} ${styles.option}`} />
			</a>

	})

	return (
		<header className={styles.headerBox}>
			{sections}
			<a href={`#${Sections.HOME}`} onClick={goToHome} className={styles.headerPhoto}>
				<Image width={103} height={103} layout='responsive' src='/images/header_photo1.png' alt="header_photo" className={styles.headerPhoto} />
			</a>
		</header>
	)
}
