"use client"

import { useState } from 'react'
import Image from 'next/image'
import styles from "./work-card.module.css"

interface WorkGalleryProps {
	images: string[]
	projectName: string
	prevLabel: string
	nextLabel: string
}

export const WorkGallery = ({ images, projectName, prevLabel, nextLabel }: WorkGalleryProps) => {
	const [activeIndex, setActiveIndex] = useState(0)

	if (images.length === 0) {
		return null
	}

	const move = (direction: 'left' | 'right') => {
		setActiveIndex((currentIndex) => {
			if (direction === 'left') {
				return (currentIndex - 1 + images.length) % images.length
			}

			return (currentIndex + 1) % images.length
		})
	}

	return (
		<div className={styles.caseGallery}>
			{images.length > 1 && (
				<button type="button" className={styles.galleryButton} onClick={() => move('left')} aria-label={prevLabel}>
					<Image src="/icons/button-triangle.svg" alt="" width={36} height={36} sizes="36px" />
				</button>
			)}
			<div className={styles.galleryViewport}>
				<Image
					key={`${projectName}-${activeIndex}`}
					src={images[activeIndex]}
					alt={`${projectName} screenshot ${activeIndex + 1}`}
					className={styles.galleryImage}
					loading="lazy"
					width={640}
					height={420}
					quality={70}
					sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, 440px"
				/>
				{images.length > 1 && (
					<span className={styles.galleryCounter}>
						{activeIndex + 1} / {images.length}
					</span>
				)}
			</div>
			{images.length > 1 && (
				<button type="button" className={styles.galleryButton} onClick={() => move('right')} aria-label={nextLabel}>
					<Image src="/icons/button-triangle.svg" alt="" width={36} height={36} sizes="36px" className={styles.buttonRotate} />
				</button>
			)}
		</div>
	)
}
