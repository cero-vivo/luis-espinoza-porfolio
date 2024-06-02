import React, { FC } from 'react'
import styles from "./heading.module.css"
import { en, textKeys } from '@/lenguages/en'

interface HeadingProps {
	variant: "h1" | "h2" | "h3",
	text: textKeys
}

export const Heading: FC<HeadingProps> = (props) => {

	const { variant, text } = props

	return (
		<>
			{variant == "h1" && <h1 className={styles.h1}>{en[text]}</h1>}
			{variant == "h2" && <h2 className={styles.h2}>{en[text]}</h2>}
			{variant == "h3" && <h3 className={styles.h3}>{en[text]}</h3>}
		</>
	)
}
