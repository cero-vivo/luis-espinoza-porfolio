"use client"

import { Languages } from '@/types/constant'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { startTransition, useTransition } from 'react'
import { Paragraph } from '../paragraph/paragraph'
import styles from "./language-switcher.module.css"

export const LanguageSwitcher = () => {

	const [isPending, starTransition] = useTransition()
	const router = useRouter()
	const localActive = useLocale()

	const esIsSelected = localActive === Languages.ES
	const enIsSelected = localActive === Languages.EN
	
	const selectES = () => {
		startTransition(() => {
			router.replace(`/${Languages.ES}`)
		})
	}
	const selectEN = () => {
		startTransition(() => {
			router.replace(`/${Languages.EN}`)
		})
	}
	
    return (
		<span className={styles.switcherBox}>
			<Paragraph 
				customTx='EN' 
				variant='regular' 
				classes={`${styles.text} ${enIsSelected && styles.selectedText} ${styles.option}`}
				onClick={selectEN}
			/>
			<Paragraph customTx='/' variant='regular' classes={styles.text}/>
			<Paragraph 
				customTx='ES' 
				variant='regular' 
				classes={`${styles.text} ${esIsSelected && styles.selectedText} ${styles.option}`}
				onClick={selectES}
			/>
		</span>
  	)
}
