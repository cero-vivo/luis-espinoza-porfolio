"use client"
import React, { FC, useEffect, useRef } from 'react'
import styles from "./frame.module.css"
import { useLandingStore } from '@/model/landing-store'
import { Sections } from '@/types/constant'

interface FrameProps {
	children?: React.ReactNode
	classes?: string
	id?: string
	threshold?: number
}
export const Frame: FC<FrameProps> = (props) => {
	const { threshold = 0.015 } = props
	const ref = useRef<HTMLElement | null>(null)
    const setActionSection = useLandingStore(s => s.setActionSection)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry], obs) => {
				if (entry.isIntersecting) {
					element.classList.add(styles.inView)
					// Update current section in store if id provided
					if (props.id) {
						setActionSection(props.id as Sections)
					}
				}
			},
			{ threshold }
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [threshold])

	return (
		<main ref={ref} className={`${styles.frame} ${props.classes}`} id={props?.id}>
			{props.children}
		</main>
	)
}
