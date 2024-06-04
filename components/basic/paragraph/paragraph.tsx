import React, { FC } from 'react'
import styles from "./paragraph.module.css"
import { en, textKeys } from '@/lenguages/en'

interface ParagraphProps {
	text?: textKeys
    variant: "bold" | "regular"
    classes?: string
	customTx?: string
	onClick?: () => void
}

export const Paragraph: FC<ParagraphProps> = (props) => {

	const { text, variant, classes, customTx, onClick } = props

	const finalText = customTx ? customTx : (text ? en[text] : "")

	return (
        <p onClick={onClick} className={`${styles.paragraph} ${variant === "bold" ? styles.bold : styles.regular} ${classes}`}>
				{finalText?.toString()}
		</p>
	)
}
