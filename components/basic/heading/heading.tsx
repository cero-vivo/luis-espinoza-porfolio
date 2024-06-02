import React, { FC } from 'react'
import styles from "./heading.module.css"
import { en, textKeys } from '@/lenguages/en'

interface HeadingProps {
	variant: "h1" | "h2" | "h3",
	text: textKeys
	classes?: string
}

export const Heading: FC<HeadingProps> = (props) => {

	const { variant, text, classes } = props

	return (
		<>
			{variant == "h1" && <h1 className={`${styles.h1} ${classes}`}>{en[text]}</h1>}
			{variant == "h2" && <h2 className={`${styles.h2} ${classes}`}>{en[text]}</h2>}
			{variant == "h3" && <h3 className={`${styles.h3} ${classes}`}>{en[text]}</h3>}
		</>
	)
}
