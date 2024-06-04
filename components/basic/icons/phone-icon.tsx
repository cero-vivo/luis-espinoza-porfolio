import React, { FC } from "react"
import { SvgIconProps } from "./icons.types";

export const PhoneIcon: FC<SvgIconProps> = (props) => {

	const { color, width, height, classes, onClick } = props

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			className={classes}
			onClick={onClick}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.71429 23C6.07616 23 5 21.5067 5 20V4C5 2.49332 6.07616 1 7.71429 1H16.2857C17.9238 1 19 2.49332 19 4V20C19 21.5067 17.9238 23 16.2857 23H7.71429ZM12 21C12.8284 21 13.5 20.3284 13.5 19.5C13.5 18.6716 12.8284 18 12 18C11.1716 18 10.5 18.6716 10.5 19.5C10.5 20.3284 11.1716 21 12 21Z"
				fill={color}
			/>
		</svg>
	)
}