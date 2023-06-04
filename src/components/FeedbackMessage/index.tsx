import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import { Flex, Loader, Text, useMantineTheme } from '@mantine/core'
import { FC } from 'react'

type FeedbackMessageProps = {
	isLoading?: boolean
	message?: string
	icon?: FontAwesomeIconProps['icon']
	fullHeight?: boolean
	error?: ErrorResponse
}

const FeedbackMessage: FC<FeedbackMessageProps> = props => {
	const { icon, isLoading, message, fullHeight = true, error } = props
	const theme = useMantineTheme()

	return (
		<Flex
			justify='center'
			align='center'
			direction='column'
			gap='xs'
			p='xl'
			{...(fullHeight && {
				h: '100%',
			})}
		>
			{!isLoading ? (
				<FontAwesomeIcon
					icon={icon && !error ? icon : faTriangleExclamation}
					color={theme.colors.red[6]}
					size='xl'
				/>
			) : (
				<Loader />
			)}
			<Text align='center'>
				{error
					? error.response?.data.message
						? `Ocurrió el siguiente error: ${error.response?.data.message}`
						: error.message
					: message}
			</Text>
		</Flex>
	)
}

export default FeedbackMessage
