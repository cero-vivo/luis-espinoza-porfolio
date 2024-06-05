"use client"

import { Languages } from '@/types/constant'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { Paragraph } from '../paragraph/paragraph'
import styles from "./language-switcher.module.css"

export const LanguageSwitcher = () => {

	const [isPending, starTransition] = useTransition()
	const router = useRouter()
	const localActive = useLocale()

	const esIsSelected = localActive === Languages.ES
	const enIsSelected = localActive === Languages.EN
	
	const selectES = () => {
		starTransition(() => {
			router.replace(`/${Languages.ES}`)
		})
	}
	const selectEN = () => {
		starTransition(() => {
			router.replace(`/${Languages.EN}`)
		})
	}
	
    return (
		<span className={styles.switcherBox}>
			<Paragraph 
				text='EN' 
				variant='regular' 
				classes={`${styles.text} ${enIsSelected && styles.selectedText} ${styles.option}`}
				onClick={selectEN}
			/>
			<Paragraph text='/' variant='regular' classes={styles.text}/>
			<Paragraph 
				text='ES' 
				variant='regular' 
				classes={`${styles.text} ${esIsSelected && styles.selectedText} ${styles.option}`}
				onClick={selectES}
			/>
		</span>
  	)
}
