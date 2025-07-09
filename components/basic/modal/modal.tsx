
import React, { FC, ReactNode } from 'react'
import styles from "./modal.module.css"

interface ModalProps {
	isOpen: boolean
	children: ReactNode
	classes?: string
	onBackgroundClick?: (e?: any) => void
}

export const Modal: FC<ModalProps> = (props) => {

	const { isOpen, children, classes, onBackgroundClick } = props

	const onClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		onBackgroundClick?.()
	}

	return (
		<main className={`${isOpen ? styles.overlay : styles.close} ${classes}`} onClick={onClick} >
			<div className={` ${isOpen ? styles.childBoxOpen : styles.childBoxClose} `}>
				{children}
			</div>
		</main>
	)
}
