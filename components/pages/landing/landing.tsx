import { Frame } from '@/components/basic/frame/frame'
import React from 'react'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import styles from "./landing.module.css"
import { TechStack } from '@/components/shared/tech-stack/tech-stack'
import { TechIcon } from '@/components/shared/tech-stack/tech-index'
import { Header } from '@/components/shared/header/header'
import { Sections } from '@/types/constant'
import { ContactModal } from '@/components/modals/contact-modal'
import { LetsTalkButton } from './lets-talk-button'

const iconStack: TechIcon[] = [
	"postgres",
	"typescript",
	"react",
	"css3",
	"html5",
	"mongodb",
	"firebase",
	"mst",
	"next",
	"zustand",
]

export const Landing = () => {
	return (
		<Frame id={Sections.HOME}>
			<ContactModal/>
			<Header />
			<Heading variant={"h1"} text={"landing_title"} classes={styles.title}/>
			<Paragraph text={"landing_message"} variant='bold' classes={styles.message}/>
			<TechStack icons={iconStack}/>
			<LetsTalkButton classes={styles.button}/>
		</Frame>
	)
}
