import React, { FC } from 'react'
import styles from "./frame.module.css"

interface FrameProps {
	children?: React.ReactNode
}
export const Frame: FC<FrameProps> = (props) => {
	return (
		<main className={styles.frame}>
			{props.children}
		</main>
	)
}
