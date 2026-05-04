'use client'

import { useState } from 'react'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'
import { useTranslations } from 'next-intl'
import styles from "./works.module.css"
import { ProjectCategory, ProjectType, projects } from './projects-data'
import { WorkCard } from './work-card'

type FilterKey = 'all' | ProjectCategory

const filterKeys: FilterKey[] = ['all', 'fintech', 'mobile', 'web', 'ai', 'experimental']

export const Works = () => {

	const t = useTranslations("works")
	const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

	const filteredProjects = activeFilter === 'all'
		? projects
		: projects.filter((project) => project.categories.includes(activeFilter))

	const worksList = filteredProjects.map((work: ProjectType) => {
		const projectId = work.name.toLowerCase().replace(/[^a-z0-9]/g, '-')

		return (
			<WorkCard
				work={work}
				key={work.name}
				projectId={projectId}
			/>
		)
	})

	return (
		<Frame id={Sections.WORKS} threshold={0.02} classes={styles.worksFrame}>
			<section className={styles.sectionHeader}>
				<span className={styles.overline}>{t('overline')}</span>
				<Heading text={t("title")} variant='h2' classes={styles.title} />
				<Paragraph text={t('intro')} variant='regular' classes={styles.subtitle} />
			</section>
			<div className={styles.filterRow}>
				{filterKeys.map((filterKey) => (
					<button
						key={filterKey}
						type='button'
						onClick={() => setActiveFilter(filterKey)}
						className={`${styles.filterPill} ${activeFilter === filterKey ? styles.filterPillActive : ''}`}
					>
						{t(`filters.${filterKey}`)}
					</button>
				))}
			</div>
			<div className={styles.worksBox}>
				{worksList}
			</div>
		</Frame>
	)
}
