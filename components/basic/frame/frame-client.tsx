"use client"

import { useEffect, useRef } from 'react'
import styles from "./frame.module.css"
import { useLandingStore } from '@/model/landing-store'
import { Sections } from '@/types/constant'
import { useSectionTracking } from '@/hooks/useAnalytics'
import { useConsent } from '@/hooks/useConsent'

interface FrameClientProps {
	children?: React.ReactNode
	classes?: string
	id?: string
	threshold?: number
}

export const FrameClient = ({ children, classes, id, threshold = 0.015 }: FrameClientProps) => {
	const ref = useRef<HTMLElement | null>(null)
	const setActionSection = useLandingStore((store) => store.setActionSection)
	const actionSection = useLandingStore((store) => store.actionSection)
	const { consent } = useConsent()
	const sectionId = id as Sections | undefined
	const isCurrentSection = sectionId ? actionSection === sectionId : false

	useSectionTracking(
		sectionId ?? Sections.HOME,
		Boolean(sectionId) && consent === 'granted' && isCurrentSection
	)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return

				element.classList.add(styles.inView)

				if (sectionId) {
					setActionSection(sectionId)
				}
			},
			{ threshold }
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [sectionId, setActionSection, threshold])

	return (
		<section ref={ref} className={`${styles.frame} ${styles.inView} ${classes ?? ''}`} id={id}>
			{children}
		</section>
	)
}
