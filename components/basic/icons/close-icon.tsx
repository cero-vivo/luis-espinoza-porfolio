import React, { FC } from "react"
import { SvgIconProps } from "./icons.types";

export const CloseIcon: FC<SvgIconProps> = (props) => {

	const { color, width, height, classes, onClick } = props

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 17 17"
			className={classes}
			onClick={onClick}
		>
			<path
				d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z"
				fill={color}
			/>
		</svg>
	)
}