import Image from 'next/image'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'
import { useTranslations } from 'next-intl'
import styles from "./skills.module.css"

const areaKeys = ["product", "engineering", "enablement"] as const
const metricKeys = ["experience", "delivery", "mentoring"] as const

export const Skills = () => {
	const t = useTranslations('skills')

	const areaCards = areaKeys.map((key) => {
		const highlights = t(`areas.${key}.bullets`).split('|').map(item => item.trim()).filter(Boolean)
		return (
			<article className={styles.skillCard} key={key}>
				<h3 className={styles.cardTitle}>{t(`areas.${key}.title`)}</h3>
				<Paragraph text={t(`areas.${key}.description`)} variant='regular' classes={styles.cardDescription} />
				<ul className={styles.cardList}>
					{highlights.map((highlight, index) => (
						<li key={`${key}-highlight-${index}`} className={styles.cardItem}>
							<span aria-hidden className={styles.cardBullet} />
							<span>{highlight}</span>
						</li>
					))}
				</ul>
			</article>
		)
	})

	const metrics = metricKeys.map((key) => (
		<div className={styles.metricCard} key={key}>
			<span className={styles.metricValue}>{t(`metrics.${key}.value`)}</span>
			<span className={styles.metricLabel}>{t(`metrics.${key}.label`)}</span>
		</div>
	))

	return (
		<Frame id={Sections.SKILLS} classes={styles.skillsFrame}>
			<section className={styles.sectionHeader}>
				<span className={styles.overline}>{t('overline')}</span>
				<Heading text={t('title')} variant='h2' classes={styles.title} />
				<Paragraph text={t('intro')} variant='regular' classes={styles.subtitle} />
			</section>
			<div className={styles.metricRow}>
				{metrics}
			</div>
			<section className={styles.contentLayout}>
				<div className={styles.cardGrid}>
					{areaCards}
				</div>
				<div className={styles.visualPanel}>
					<div className={styles.visualGlow} aria-hidden />
					<Image
						src='/images/avatar_laptop.png'
						alt='Luis Espinoza collaborating with product teams'
						width={420}
						height={560}
						className={styles.mainImage}
						loading='lazy'
					/>
					<div className={styles.quoteBox}>
						<span className={styles.quoteSymbol}>“</span>
						<p className={styles.quoteText}>{t('quote.text')}</p>
						<span className={styles.quoteAuthor}>{t('quote.author')}</span>
					</div>
				</div>
			</section>
		</Frame>
	)
}
