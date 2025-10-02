import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'
import { LetsTalkButton } from './lets-talk-button'
import styles from "./landing.module.css"
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { TechStack } from '@/components/shared/tech-stack/tech-stack'
import { TechIcon, techIcons } from '@/components/shared/tech-stack/tech-index'

const iconStack: TechIcon[] = [
	"react",
	"typescript",
	"next",
	"firebase",
	"figma",
	"redux",
	"cursor",
	"claude",
	"codex",
	"copilot",
	"warp",
	"postgres",
	"notebooklm",
]

type OrbitStyle = CSSProperties & {
	"--translateX": string
	"--translateY": string
	"--floatDelay": string
}

const metricKeys = ["impact", "launches", "leadership"] as const
const statusKeys = ["location"] as const
const pillarKeys = ["product", "delivery", "partnership"] as const

export const Landing = () => {

	const t = useTranslations("landing")

	const orbitIcons = iconStack.map((icon, index) => {
		const angle = (index / iconStack.length) * Math.PI * 2
		const radius = 140 + (((index % 4) - 1.5) * 16)
		const translateX = Math.cos(angle) * radius
		const translateY = Math.sin(angle) * radius

		const style: OrbitStyle = {
			"--translateX": `${translateX}px`,
			"--translateY": `${translateY}px`,
			"--floatDelay": `${(index % 6) * 0.28}s`,
		}

		return {
			icon,
			style,
		}
	})

	const metrics = metricKeys.map((key) => ({
		value: t(`metrics.${key}.value`),
		label: t(`metrics.${key}.label`),
		description: t(`metrics.${key}.description`),
	}))

	const status = statusKeys.map((key) => ({
		label: t(`status.${key}.label`),
		value: t(`status.${key}.value`),
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
					<div className={styles.avatarOrbit}>
						<span className={styles.avatarGlow} aria-hidden />
						<span className={styles.haloRing} aria-hidden />
						<span className={styles.haloRingSecondary} aria-hidden />
						{orbitIcons.map(({ icon, style }) => (
							<span className={styles.haloIcon} style={style} key={`${icon}-${style["--translateX"]}`}>
								<span className={styles.haloIconInner}>
									<Image src={techIcons[icon]} alt={`${icon} icon`} width={44} height={44} className={styles.haloIconImage} />
								</span>
							</span>
						))}
						<Image src="/images/ia-drven.png" alt="Luis Espinoza" width={360} height={360} priority className={styles.avatarImage} />
					</div>
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
			<section className={styles.stackCard}>
				<div className={styles.visualCard}>
					<span className={styles.visualLabel}>{t('stack.title')}</span>
					<TechStack icons={iconStack} boxClasses={styles.techIcons} iconClasses={styles.heroIcon} />
				</div>
			</section>
		</Frame>
	)
}
