import { getUserSession } from '@/utils'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	ActionIcon,
	Flex,
	PasswordInput,
	TextInput,
	Title,
	Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import UpdatePassowordModal from '../UpdatePasswordModal'

const LoginCredentials = () => {
	const userSession = getUserSession()
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Title size='h3'>Credenciales de ingreso</Title>
			<TextInput
				disabled
				label='Email'
				placeholder='Email'
				defaultValue={userSession?.email || ''}
			/>
			<Flex
				align='flex-end'
				gap='xs'
			>
				<PasswordInput
					disabled
					label='Contraseña'
					placeholder='Contraseña'
					defaultValue='********'
					style={{
						flexGrow: 1,
					}}
				/>
				<Tooltip
					label='Editar contraseña'
					withArrow
				>
					<ActionIcon
						color='red'
						variant='filled'
						size='lg'
						onClick={open}
					>
						<FontAwesomeIcon icon={faPen} />
					</ActionIcon>
				</Tooltip>
			</Flex>
			<UpdatePassowordModal
				opened={opened}
				onClose={close}
			/>
		</>
	)
}

export default LoginCredentials
