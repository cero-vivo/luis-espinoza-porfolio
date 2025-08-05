"use client"
import React, { useEffect, useRef } from 'react'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import styles from "./works.module.css"
import { Sections } from '@/types/constant'
import { ProjectType, projects } from './projects-data'
import { WorkCard } from './work-card'
import { useTranslations } from 'next-intl'

export const Works = () => {

	const t = useTranslations("works")

	const works = projects.map((work: ProjectType, index: number) => {
		// Crear un ID único para cada proyecto basado en su nombre
		const projectId = work.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
		return <WorkCard work={work} key={work.name} projectId={projectId} />
	})

	return (
		<Frame id={Sections.WORKS} threshold={0.02}>
			<Heading text={t("title")} variant='h2' classes={styles.title} />
			<div className={styles.worksBox}>
				{works}
			</div>
		</Frame>
	)
}
