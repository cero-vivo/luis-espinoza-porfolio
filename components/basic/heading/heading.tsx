import React, { FC } from 'react'
import styles from "./heading.module.css"

interface HeadingProps {
	variant: "h1" | "h2" | "h3",
	text?: string
	customTx?: string
	classes?: string
}

export const Heading: FC<HeadingProps> = (props) => {

	const { variant, text = null, classes, customTx = null } = props


	return (
		<>
			{variant === "h1" && <h1 className={`${styles.h1} ${classes}`}>{text}</h1>}
			{variant === "h2" && <h2 className={`${styles.h2} ${classes}`}>{text}</h2>}
			{variant === "h3" && <h3 className={`${styles.h3} ${classes}`}>{text}</h3>}
		</>
	)
}
