import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'
import { LetsTalkButton } from './lets-talk-button'
import styles from "./landing.module.css"
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { TechStack } from '@/components/shared/tech-stack/tech-stack'
import { TechIcon } from '@/components/shared/tech-stack/tech-index'

const iconStack: TechIcon[] = [
	"react",
	"next",
	"typescript",
	"firebase",
	"postgres",
	"tailwind",
	"redux",
	"amazon",
	"zustand",
]

const metricKeys = ["impact", "launches", "leadership"] as const
const statusKeys = ["availability", "location", "collaboration"] as const
const pillarKeys = ["product", "delivery", "partnership"] as const

export const Landing = () => {

	const t = useTranslations("landing")

	const metrics = metricKeys.map((key) => ({
		value: t(`metrics.${key}.value`),
		label: t(`metrics.${key}.label`),
		description: t(`metrics.${key}.description`),
	}))

	const status = statusKeys.map((key) => ({
		label: t(`status.${key}.label`),
		value: t(`status.${key}.value`),
	}))

	const pillarCards = pillarKeys.map((key) => ({
		title: t(`pillars.${key}.title`),
		description: t(`pillars.${key}.description`),
	}))

	const trustedClients = t('trusted.list').split('|').map((client) => client.trim()).filter(Boolean)

	return (
		<Frame id={Sections.HOME} classes={styles.heroFrame}>
			<section className={styles.heroLayout}>
				<span className={styles.heroBackground} aria-hidden />
				<div className={styles.heroCopy}>
					<span className={styles.overline}>{t('overline')}</span>
					<Heading variant={"h1"} text={t("title")} classes={styles.title} />
					<Paragraph text={t("message")} variant='regular' classes={styles.message} />
					<div className={styles.ctaRow}>
						<LetsTalkButton classes={styles.primaryCta} />
						<a href={`#${Sections.WORKS}`} className={styles.secondaryCta}>{t('actions.view_cases')}</a>
					</div>
					<div className={styles.metricsRow}>
						{metrics.map((metric) => (
							<article className={styles.metricCard} key={`${metric.label}-${metric.value}`}>
								<span className={styles.metricValue}>{metric.value}</span>
								<span className={styles.metricLabel}>{metric.label}</span>
								<Paragraph text={metric.description} variant='regular' classes={styles.metricDescription} />
							</article>
						))}
					</div>
					<div className={styles.statusRow}>
						{status.map((item) => (
							<span className={styles.statusChip} key={`${item.label}-${item.value}`}>
								<span className={styles.statusDot} aria-hidden />
								<span className={styles.statusLabel}>{item.label}</span>
								<span className={styles.statusValue}>{item.value}</span>
							</span>
						))}
					</div>
				</div>
				<div className={styles.heroVisual}>
					<Image src="/images/avatar_laptop.png" alt="Luis Espinoza" width={360} height={360} priority className={styles.avatarImage} />
				</div>
			</section>
			<section className={styles.stackCard}>
				<div className={styles.visualCard}>
					<span className={styles.visualLabel}>{t('stack.title')}</span>
					<TechStack icons={iconStack} boxClasses={styles.techIcons} iconClasses={styles.heroIcon} />
					<Paragraph text={t('stack.description')} variant='regular' classes={styles.visualCopy} />
				</div>
			</section>
			<section className={styles.trustedRow}>
				<span className={styles.trustedLabel}>{t('trusted.label')}</span>
				<ul className={styles.trustedList}>
					{trustedClients.map((client) => (
						<li key={client} className={styles.trustedItem}>{client}</li>
					))}
				</ul>
			</section>
			<section className={styles.pillarGrid}>
				{pillarCards.map((card) => (
					<article key={card.title} className={styles.pillarCard}>
						<h3 className={styles.pillarTitle}>{card.title}</h3>
						<Paragraph text={card.description} variant='regular' classes={styles.pillarDescription} />
					</article>
				))}
			</section>
		</Frame>
	)
}
