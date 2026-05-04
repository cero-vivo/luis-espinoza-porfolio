import { FrameClient } from './frame-client'

interface FrameProps {
	children?: React.ReactNode
	classes?: string
	id?: string
	threshold?: number
}
export const Frame = ({ children, classes, id, threshold }: FrameProps) => {
	return (
		<FrameClient classes={classes} id={id} threshold={threshold}>
			{children}
		</FrameClient>
	)
}
