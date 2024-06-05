"use client"

import React, { FC } from 'react'
import styles from "./button.module.css"
import { Paragraph } from '../paragraph/paragraph'

interface ButtonProps {
	classes?: string
	text: string
	onClick?: () => void
}

export const Button: FC<ButtonProps> = (props) => {

	const { classes, text, onClick } = props

	return (
		<button className={`${styles.primary} ${classes}`} onClick={onClick}>
			<Paragraph text={text} classes={styles.primaryText} variant='bold'/>
		</button>
	)
}