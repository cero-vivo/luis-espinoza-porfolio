import React, { FC } from 'react'
import { TechIcon, techIcons } from './tech-index'
import styles from "./icon.module.css"
import Image from 'next/image'

interface TechStackProps {
	icons: TechIcon[]
	iconClasses?: string
	boxClasses?: string
}

export const TechStack: FC<TechStackProps> = (props) => {

	const { icons, iconClasses, boxClasses } = props

	const iconsList = icons.map((techIcon: TechIcon) => {
		const icon = techIcons[techIcon]
		return <Image width={60} height={60} key={techIcon} src={icon} alt={techIcon} className={`${styles.icon} ${iconClasses}`} loading='lazy' />
	})

	return (
		<div className={`${styles.techIconsBox} ${boxClasses}`}>
			{iconsList}
		</div>
	)
}
