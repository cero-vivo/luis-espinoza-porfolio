import { Frame } from '@/components/basic/frame/frame'
import React from 'react'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import styles from "./landing.module.css"

export const Landing = () => {
	return (
		<Frame>
			<Heading variant={"h1"} text={"landing_title"} classes={styles.title}/>
			<Paragraph text={"landing_message"} variant='bold' classes={styles.message}/>
		</Frame>
	)
}
