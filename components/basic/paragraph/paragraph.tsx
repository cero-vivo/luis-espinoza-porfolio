import React, { FC } from 'react'
import styles from "./paragraph.module.css"
import { en, textKeys } from '@/lenguages/en'

interface ParagraphProps {
	text: textKeys
    variant: "bold" | "regular"
    classes?: string
}

export const Paragraph: FC<ParagraphProps> = (props) => {

	const { text, variant, classes } = props

	return (
        <p className={`${styles.paragraph} ${variant === "bold" ? styles.bold : styles.regular} ${classes}`}>{en[text]}</p>
	)
}
