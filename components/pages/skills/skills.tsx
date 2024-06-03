import React from 'react'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import styles from "./skills.module.css"
import { en, textKeys } from '@/lenguages/en'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'

export const Skills = () => {

	const sections = en["skills_sections"]?.map((section, index) => {
		const isFirst = index === 0
		return (
			<span className={`${styles.sectionBox}`} key={section.title}>
				<Heading variant='h3' customTx={en["skills_sections"][index]?.title as textKeys} classes={`${styles.title} ${!isFirst && styles.noFirstTitle}`} />
				<ul className={styles.listBox}>
					{section.items?.map(item => {
						return (
							<li key={item} className={styles.itemBox}>
								<Paragraph customTx={item} variant='regular' classes={styles.itemText} />
							</li>
						)
					})}
				</ul>
			</span>
		)
	})

	return (
		<Frame id={Sections.SKILLS}>
			<Heading text={"skills_title"} variant='h2' classes={styles.title}/>
			<section className={styles.contentBox}>
				<img src='/images/skills_photo.png' alt="skills" className={styles.mainImage} loading='lazy' />
				<span className={styles.detailBox}>
				{sections}
				</span>
			</section>
		</Frame>
	)
}
