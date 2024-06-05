import React, { FC } from 'react'
import styles from "./paragraph.module.css"
import { en, textKeys } from '@/lenguages/en'

interface ParagraphProps {
	text?: string
    variant: "bold" | "regular"
    classes?: string
	onClick?: () => void
}

export const Paragraph: FC<ParagraphProps> = (props) => {

	const { text, variant, classes, customTx, onClick } = props

	return (
        <p onClick={onClick} className={`${styles.paragraph} ${variant === "bold" ? styles.bold : styles.regular} ${classes}`}>
				{text}
		</p>
	)
}
