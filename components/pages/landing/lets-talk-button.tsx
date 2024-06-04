"use client"

import { Button } from "@/components/basic/button/button"
import { useLandingStore } from "@/model/landing-store"
import { FC } from "react"

interface LetsTalkButtonProps {
	classes?: string
}


export const LetsTalkButton: FC<LetsTalkButtonProps> = (props) => {

	const { classes } = props
	const { openContactModal } = useLandingStore()

	return (
		<Button text={"landing_button"} classes={classes} onClick={openContactModal}/>
	)
}
