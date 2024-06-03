import React from 'react'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import styles from "./works.module.css"
import { Sections } from '@/types/constant'
import { ProjectType, projects } from './projects-data'
import { WorkCard } from './work-card'

export const Works = () => {

	const works = projects.map((work: ProjectType) => {
		return <WorkCard work={work} key={work.name} />
	})

	return (
		<Frame id={Sections.WORKS}>
			<Heading text={"works_title"} variant='h2' classes={styles.title}/>
			<div className={styles.worksBox}>
				{works}
			</div>
		</Frame>
	)
}
