import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import { Flex, Loader, Text, useMantineTheme } from '@mantine/core'
import { FC } from 'react'

type FeedbackMessageProps = {
	isLoading?: boolean
	message: string
	icon?: FontAwesomeIconProps['icon']
	fullHeight?: boolean
}

const FeedbackMessage: FC<FeedbackMessageProps> = props => {
	const { icon, isLoading, message, fullHeight = true } = props
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
			{!isLoading && icon ? (
				<FontAwesomeIcon
					icon={icon}
					color={theme.colors.red[6]}
					size='xl'
				/>
			) : (
				<Loader />
			)}
			<Text align='center'>{message}</Text>
		</Flex>
	)
}

export default FeedbackMessage
