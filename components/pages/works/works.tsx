"use client"
import React from 'react'
import { Frame } from '@/components/basic/frame/frame'
import styles from "./works.module.css"
import { Sections } from '@/types/constant'
import { projects } from './projects-data'
import { FreeNavigationProjects } from './free-navigation-projects/free-navigation-projects'
import { useTranslations } from 'next-intl'

export const Works = () => {
	const t = useTranslations("works")

	return (
		<Frame id={Sections.WORKS} threshold={0.02}>
			<FreeNavigationProjects 
				projects={projects} 
				title={t("title")} 
			/>
		</Frame>
	)
}
