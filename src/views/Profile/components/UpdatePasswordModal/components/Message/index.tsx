import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Text } from '@mantine/core'
import { FC } from 'react'

type MessageProps = {
	error?: boolean
	label: string
}

const Message: FC<MessageProps> = props => {
	const { error, label } = props

	return (
		<Text
			weight='bold'
			color={error ? 'red' : 'green'}
			sx={{ display: 'flex', alignItems: 'center' }}
			size='xs'
		>
			{error ? (
				<FontAwesomeIcon icon={faXmark} />
			) : (
				<FontAwesomeIcon icon={faCheck} />
			)}
			<Box ml='xs'>{label}</Box>
		</Text>
	)
}

export default Message
