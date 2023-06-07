import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	Avatar,
	Box,
	Button,
	Flex,
	Modal,
	ModalProps,
	PasswordInput,
	Text,
} from '@mantine/core'
import { FC } from 'react'

type UpdatePassowordModalProps = {
	opened: ModalProps['opened']
	onClose: ModalProps['onClose']
}

const UpdatePassowordModal: FC<UpdatePassowordModalProps> = props => {
	const { opened, onClose } = props

	return (
		<Modal
			size='sm'
			opened={opened}
			onClose={onClose}
			withCloseButton={false}
			centered
		>
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
					<FontAwesomeIcon icon={faPen} />
				</Avatar>
				<Box>
					<Text
						size='lg'
						weight='bold'
					>
						Editar contraseña
					</Text>
					Ingrese la nueva contraseña
				</Box>
			</Flex>
			<Flex
				direction='column'
				gap='md'
				mt='md'
			>
				<PasswordInput
					autoFocus
					placeholder='Contraseña'
				/>
				<PasswordInput placeholder='Repite la contraseña' />
			</Flex>
			<Flex
				justify='flex-end'
				gap='md'
				mt='md'
			>
				<Button onClick={onClose}>Guardar</Button>
				<Button
					variant='outline'
					color='gray'
					onClick={onClose}
				>
					Cerrar
				</Button>
			</Flex>
		</Modal>
	)
}

export default UpdatePassowordModal
