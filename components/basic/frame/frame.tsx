import React, { FC } from 'react'
import styles from "./frame.module.css"

interface FrameProps {
	children?: React.ReactNode
	classes?: string
	id?: string
}
export const Frame: FC<FrameProps> = (props) => {
	return (
		<main className={`${styles.frame} ${props.classes}`} id={props?.id}>
			{props.children}
		</main>
	)
}
