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
					<div className={styles.photoStack}>
						<Image width={260} height={320} src='/images/ethos_photo1.jpeg' alt='Luis collaborating with product leaders' className={`${styles.image} ${styles.image1}`} loading='lazy' />
						<Image width={220} height={280} src='/images/ethos_photo2.jpeg' alt='Luis speaking at an event' className={`${styles.image} ${styles.image2}`} loading='lazy' />
						<Image width={220} height={280} src='/images/ethos_photo3.jpeg' alt='Luis exploring creative inspirations' className={`${styles.image} ${styles.image3}`} loading='lazy' />
					</div>
					<div className={styles.storyText}>
						{storyParagraphs.map((paragraph, index) => (
							<Paragraph key={`story-${index}`} text={paragraph} variant='regular' classes={styles.storyParagraph} />
						))}
					</div>
				</div>
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
			</section>
		</Frame>
	)
}
