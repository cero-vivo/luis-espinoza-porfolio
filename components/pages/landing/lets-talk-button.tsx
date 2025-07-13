"use client"

import { Button } from "@/components/basic/button/button"
import { useContactActions } from "@/model/landing-store"
import { useTranslations } from "next-intl"
import { FC } from "react"

interface LetsTalkButtonProps {
	classes?: string
}


export const LetsTalkButton: FC<LetsTalkButtonProps> = (props) => {

	const { classes } = props
	const { openContactModal } = useContactActions()
	const t = useTranslations("landing")


	return (
		<Button text={t("button")} classes={classes} onClick={openContactModal}/>
	)
}
