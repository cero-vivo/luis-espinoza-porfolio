"use client"
import React, { FC, useEffect, useRef } from 'react'
import styles from "./frame.module.css"
import { useLandingStore } from '@/model/landing-store'
import { Sections } from '@/types/constant'
import { useSectionTracking } from '@/hooks/useAnalytics'
import { useConsent } from '@/hooks/useConsent'

interface FrameProps {
	children?: React.ReactNode
	classes?: string
	id?: string
	threshold?: number
	horizontal?: boolean
}
export const Frame: FC<FrameProps> = (props) => {
	const { threshold = 0.015, horizontal = true } = props
	const ref = useRef<HTMLElement | null>(null)
    const setActionSection = useLandingStore(s => s.setActionSection)
	const actionSection = useLandingStore(s => s.actionSection)
	const { consent } = useConsent()

	// Usar el hook de seguimiento cuando esta sección esté activa
	const isCurrentSection = actionSection === props.id
	useSectionTracking(
		props.id as Sections, 
		consent === 'granted' && isCurrentSection
	)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		// For horizontal layout, immediately show the section
		if (horizontal) {
			element.classList.add(styles.inView)
			if (props.id) {
				const sectionId = props.id as Sections
				setActionSection(sectionId)
			}
			return
		}

		const observer = new IntersectionObserver(
			([entry], obs) => {
				if (entry.isIntersecting) {
					element.classList.add(styles.inView)
					// Update current section in store if id provided
					if (props.id) {
						const sectionId = props.id as Sections
						setActionSection(sectionId)
					}
				}
			},
			{ threshold }
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [threshold, props.id, setActionSection, horizontal])

	const frameClasses = `${styles.frame} ${horizontal ? styles.horizontal : ''} ${props.classes || ''}`

	return (
		<main ref={ref} className={frameClasses} id={props?.id}>
			{props.children}
		</main>
	)
}
