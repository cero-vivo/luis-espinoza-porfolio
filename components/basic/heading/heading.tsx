import React, { FC } from 'react'
import styles from "./heading.module.css"
import { en, textKeys } from '@/lenguages/en'

interface HeadingProps {
	variant: "h1" | "h2" | "h3",
	text?: textKeys
	customTx?: string
	classes?: string
}

export const Heading: FC<HeadingProps> = (props) => {

	const { variant, text=null, classes, customTx=null } = props

	const finalText = customTx ? customTx : (text ? en[text] : "")

	return (
		<>
			{variant == "h1" && <h1 className={`${styles.h1} ${classes}`}>{finalText}</h1>}
			{variant == "h2" && <h2 className={`${styles.h2} ${classes}`}>{finalText}</h2>}
			{variant == "h3" && <h3 className={`${styles.h3} ${classes}`}>{finalText}</h3>}
		</>
	)
}
