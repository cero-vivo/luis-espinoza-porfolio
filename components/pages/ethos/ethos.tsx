import React from 'react'
import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import styles from "./ethos.module.css"
import { en, textKeys } from '@/lenguages/en'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'

export const Ethos = () => {

	return (
		<Frame id={Sections.ETHOS}>
			<Heading text={"ethos_title"} variant='h2' classes={styles.title}/>
			<section className={styles.contentBox}>
				<div className={styles.photosBox}>
					<img src='/images/ethos_photo1.jpeg' alt="ethos1" className={styles.image} loading='lazy' />
					<img src='/images/ethos_photo2.jpeg' alt="ethos2" className={styles.image} loading='lazy' />
					<img src='/images/ethos_photo3.jpeg' alt="ethos3" className={styles.image} loading='lazy' />
				</div>
				<div className={styles.paragraphsBox}>
					<Paragraph text='ethos_content_1' variant='regular' classes={styles.paragraph} />
					<Paragraph text='ethos_content_2' variant='regular' classes={styles.paragraph} />
					<Paragraph text='ethos_content_3' variant='regular' classes={styles.paragraph} />
					<Paragraph text='ethos_content_4' variant='regular' classes={styles.paragraph} />
				</div>
			</section>
		</Frame>
	)
}
