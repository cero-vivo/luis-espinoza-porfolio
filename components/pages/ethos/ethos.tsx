import React from 'react'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import styles from "./ethos.module.css"
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export const Ethos = () => {
	const t = useTranslations("ethos")
	return (
		<Frame id={Sections.ETHOS}>
			<Heading text={t("title")} variant='h2' classes={styles.title}/>
			<section className={styles.contentBox}>
				<div className={styles.photosBox}>
					<Image width={300} height={300} src='/images/ethos_photo1.jpeg' alt="ethos1" className={`${styles.image} ${styles.image1}`} loading='lazy' />
					<Image width={300} height={300} src='/images/ethos_photo2.jpeg' alt="ethos2" className={`${styles.image} ${styles.image2}`} loading='lazy' />
					<Image width={300} height={300} src='/images/ethos_photo3.jpeg' alt="ethos3" className={`${styles.image} ${styles.image3}`} loading='lazy' />
				</div>
				<div className={styles.paragraphsBox}>
					<Paragraph text={t('content_1')} variant='regular' classes={styles.paragraph} />
					<Paragraph text={t('content_2')} variant='regular' classes={styles.paragraph} />
					<Paragraph text={t('content_3')} variant='regular' classes={styles.paragraph} />
					<Paragraph text={t('content_4')} variant='regular' classes={styles.paragraph} />
				</div>
			</section>
		</Frame>
	)
}
