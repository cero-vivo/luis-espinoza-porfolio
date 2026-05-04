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

const THUMBNAIL_WINDOW = 4

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

	const visibleCount = Math.min(images.length, THUMBNAIL_WINDOW)
	const maxStart = Math.max(images.length - visibleCount, 0)
	const centeredStart = activeIndex - Math.floor(visibleCount / 2)
	const start = Math.min(Math.max(centeredStart, 0), maxStart)
	const visibleImages = images.slice(start, start + visibleCount)

	return (
		<div className={styles.caseGallery}>
			<div className={styles.galleryStage}>
				<div className={styles.galleryHero}>
				<Image
					key={`${projectName}-${activeIndex}`}
					src={images[activeIndex]}
					alt={`${projectName} screenshot ${activeIndex + 1}`}
					className={styles.galleryImage}
					loading="lazy"
					fill
					quality={70}
					sizes="(max-width: 760px) 88vw, (max-width: 1180px) 78vw, 34vw"
				/>
			</div>
			</div>
			{images.length > 1 && (
				<div className={styles.galleryRail}>
					<div className={styles.thumbnailList}>
						{visibleImages.map((image, offset) => {
							const index = start + offset

							return (
								<button
									key={`${projectName}-thumb-${index}`}
									type="button"
									className={`${styles.thumbnailButton} ${index === activeIndex ? styles.thumbnailActive : ''}`}
									onClick={() => setActiveIndex(index)}
									aria-label={`${projectName} screenshot ${index + 1}`}
									aria-pressed={index === activeIndex}
								>
									<span className={styles.thumbnailCard}>
										<span className={styles.thumbnailMedia}>
											<Image
												src={image}
												alt=""
												fill
												className={styles.thumbnailImage}
												loading="lazy"
												quality={55}
												sizes="(max-width: 760px) 132px, (max-width: 1180px) 22vw, 152px"
											/>
										</span>
									</span>
								</button>
							)
						})}
					</div>
					<div className={styles.galleryNav}>
						<button type="button" className={styles.galleryButton} onClick={() => move('left')} aria-label={prevLabel}>
							<Image src="/icons/button-triangle.svg" alt="" width={36} height={36} sizes="36px" />
						</button>
						<span className={styles.galleryCounter}>
							{activeIndex + 1} / {images.length}
						</span>
						<button type="button" className={styles.galleryButton} onClick={() => move('right')} aria-label={nextLabel}>
							<Image src="/icons/button-triangle.svg" alt="" width={36} height={36} sizes="36px" className={styles.buttonRotate} />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
