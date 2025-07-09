import React from 'react'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import styles from "./skills.module.css"
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export const Skills = () => {

	const t = useTranslations("skills")
	const sectionKeys = ["0", "1", "2", "3"] as const
	const sectionsItemsKeys: Array<string[]> = [
		["item_0", "item_1", "item_2", "item_3"],
		["item_0", "item_1", "item_2"],
		["item_0", "item_1"],
		["item_0", "item_1", "item_2"],
	]

	const sections = sectionKeys?.map((key, index) => {
		const isFirst = index === 0
		return (
			<span className={`${styles.sectionBox}`} key={t(`sections.${key}.title`)}>
				{<Heading variant='h3' text={t(`sections.${key}.title`)} classes={`${styles.title} ${!isFirst && styles.noFirstTitle}`} />}
				<ul className={styles.listBox}>
					{sectionsItemsKeys[index]?.map(sectionItemKey => {
						return (
							<li key={t(`sections.${key}.${sectionItemKey}`)} className={styles.itemBox}>
								<Paragraph text={t(`sections.${key}.${sectionItemKey}`)} variant='regular' classes={styles.itemText} />
							</li>
						)
					})}
				</ul>
			</span>
		)
	})

	return (
		<Frame id={Sections.SKILLS}>
			<Heading text={t("title")} variant='h2' classes={`${styles.title} ${styles.stickyTitle}`} />
			<section className={styles.contentBox}>
				<Image width={400} height={600} src='/images/skills_photo1.jpg' alt="skills" className={styles.mainImage} loading='lazy' />
				<span className={styles.detailBox}>
					{sections}
				</span>
			</section>
		</Frame>
	)
}
