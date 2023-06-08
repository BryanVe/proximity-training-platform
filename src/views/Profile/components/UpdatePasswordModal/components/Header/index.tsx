import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Flex, Text } from '@mantine/core'

const Header = () => (
	<Flex
		gap='md'
		align='center'
	>
		<Avatar
			color='red'
			variant='light'
			size='lg'
			radius='xl'
		>
			<FontAwesomeIcon icon={faLock} />
		</Avatar>
		<Box>
			<Text
				size='lg'
				weight='bold'
			>
				Editar contraseña
			</Text>
			Ingrese su nueva contraseña
		</Box>
	</Flex>
)

export default Header
