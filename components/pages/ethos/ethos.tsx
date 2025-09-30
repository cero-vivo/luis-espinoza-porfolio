import Image from 'next/image'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'
import { useTranslations } from 'next-intl'
import styles from "./ethos.module.css"

const timelineKeys = ['0', '1', '2'] as const
const testimonialKeys = ['0', '1'] as const

export const Ethos = () => {
	const t = useTranslations('ethos')
	const storyParagraphs = t('story').split('|').map(item => item.trim()).filter(Boolean)
	const media = {
		label: t('media.label'),
		caption: t('media.caption'),
		alt: t('media.alt'),
	}
	const sanitizeTitle = (value: string) => value.trim().replace(/[—:]+$/, '').replace(/[.!?]+$/, '')
	const storyHighlights = storyParagraphs.map((paragraph) => {
		const dashMatch = paragraph.match(/^\s*([^—:]+)[—:]\s*(.+)$/)
		if (dashMatch) {
			return {
				title: sanitizeTitle(dashMatch[1]),
				description: dashMatch[2].trim(),
			}
		}

		const sentenceMatch = paragraph.match(/^\s*([^.!?]+[.!?])\s*(.+)$/)
		if (sentenceMatch) {
			return {
				title: sanitizeTitle(sentenceMatch[1]),
				description: sentenceMatch[2].trim(),
			}
		}

		return {
			title: sanitizeTitle(paragraph),
			description: '',
		}
	})
	const timelineItems = timelineKeys.map((key) => ({
		period: t(`timeline.${key}.period`),
		role: t(`timeline.${key}.role`),
		description: t(`timeline.${key}.description`),
	}))
	const testimonials = testimonialKeys.map((key) => ({
		quote: t(`testimonials.${key}.quote`),
		author: t(`testimonials.${key}.author`),
	}))

	return (
		<Frame id={Sections.ETHOS} classes={styles.ethosFrame}>
			<section className={styles.sectionHeader}>
				<span className={styles.overline}>{t('overline')}</span>
				<Heading text={t('title')} variant='h2' classes={styles.title} />
				<Paragraph text={t('intro')} variant='regular' classes={styles.subtitle} />
			</section>
			<section className={styles.ethosLayout}>
				<div className={styles.storyColumn}>
					<div className={styles.storyMedia}>
						<span className={styles.mediaLabel}>{media.label}</span>
						<div className={styles.mediaVisual}>
							<Image width={360} height={360} src='/images/ethos2.png' alt={media.alt} className={styles.mediaImage} loading='lazy' />
							<span className={styles.mediaGlow} aria-hidden='true' />
						</div>
						<Paragraph text={media.caption} variant='regular' classes={styles.mediaCaption} />
					</div>
					<div className={styles.storyGrid}>
						{storyHighlights.map((highlight, index) => (
							<article key={`story-${index}`} className={styles.storyCard}>
								<span className={styles.storyIndex}>{String(index + 1).padStart(2, '0')}</span>
								<div className={styles.storyContent}>
									<h3 className={styles.storyTitle}>{highlight.title}</h3>
									{highlight.description && (
										<Paragraph text={highlight.description} variant='regular' classes={styles.storyDescription} />
									)}
								</div>
							</article>
						))}
					</div>
				</div>
				<div className={styles.detailsColumn}>
					<div className={styles.timelineColumn}>
						<h3 className={styles.columnTitle}>{t('timeline.title')}</h3>
						<ul className={styles.timelineList}>
							{timelineItems.map((item, index) => (
								<li key={`timeline-${index}`} className={styles.timelineItem}>
									<span className={styles.timelinePeriod}>{item.period}</span>
									<span className={styles.timelineRole}>{item.role}</span>
									<Paragraph text={item.description} variant='regular' classes={styles.timelineDescription} />
								</li>
							))}
						</ul>
					</div>
					<div className={styles.testimonialsColumn}>
						<h3 className={styles.columnTitle}>{t('testimonials.title')}</h3>
						<div className={styles.testimonialGrid}>
							{testimonials.map((testimonial, index) => (
								<blockquote key={`testimonial-${index}`} className={styles.testimonialCard}>
									<p className={styles.testimonialQuote}>{testimonial.quote}</p>
									<cite className={styles.testimonialAuthor}>{testimonial.author}</cite>
								</blockquote>
							))}
						</div>
					</div>
				</div>
			</section>
		</Frame>
	)
}
