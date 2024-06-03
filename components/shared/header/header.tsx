"use client"

import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { textKeys } from '@/lenguages/en'
import React from 'react'
import styles from "./header.module.css"

interface LinkProps {
	sectionId: string
	text: textKeys,
	downloadLink?: string
}

const links: LinkProps[] = [
	{
		sectionId: "skills",
		text: "header_skills"
	},
	{
		sectionId: "works",
		text: "header_works"
	},
	{
		sectionId: "ethos",
		text: "header_ethos"
	},
	{
		sectionId: "contact",
		text: "header_contact"
	},
	{
		sectionId: "cv",
		text: "header_cv",
		downloadLink: "cv/CV_Luis_Espinoza_Mobile_&_Web_Developer.pdf"
	}
]

export const Header = () => {

	const [section, setSection] = React.useState("landing")

	const sections = links.map((link) => {
		const isSelected = section === link.sectionId
		const onClick = () => {
			setSection(link.sectionId)
		}
		return link.sectionId === "cv" ? 
		(
			<a href={`${link.downloadLink}`} download={link.downloadLink} className={`${styles.option}`}>
				<Paragraph text={link.text} variant="bold" classes={`${isSelected ? styles.activeSection : undefined} ${styles.option}`}/>
			</a>
		) :
		(
			<a href={`#${link.sectionId}`} onClick={onClick} className={`${styles.option}`}>
				<Paragraph text={link.text} variant="bold" classes={`${isSelected ? styles.activeSection : undefined} ${styles.option}`}/>
			</a>
		)
	})

	return (
		<header className={styles.headerBox}>
			{sections}
			<img src='/images/header_photo.png' alt="header_photo" className={styles.headerPhoto} />
		</header>
	)
}
