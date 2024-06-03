import React, { FC } from 'react'
import styles from "./paragraph.module.css"
import { en, textKeys } from '@/lenguages/en'

interface ParagraphProps {
	text?: textKeys
    variant: "bold" | "regular"
    classes?: string
	customTx?: string
}

export const Paragraph: FC<ParagraphProps> = (props) => {

	const { text, variant, classes, customTx } = props

	const finalText = customTx ? customTx : (text ? en[text] : "")

	return (
        <p className={`${styles.paragraph} ${variant === "bold" ? styles.bold : styles.regular} ${classes}`}>{finalText}</p>
	)
}
