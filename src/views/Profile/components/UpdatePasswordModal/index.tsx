import { updatePasswordRequest } from '@/request'
import { getUserSession, notifications } from '@/utils'
import { Modal, ModalProps } from '@mantine/core'
import { FC, useState } from 'react'
import { Footer, Header, PasswordInputs } from './components'

const requirements = [
	{
		fn: (value: string) => value.length >= 6,
		label: 'Debe contener al menos 6 caracteres',
	},
	{ re: /[a-z]/, label: 'Debe contener una letra en minúsculas' },
	{ re: /[A-Z]/, label: 'Debe contener una letra en mayúsculas' },
	{
		re: /[$&+,:;=?@#|'<>.^*()%!-]/,
		label: 'Debe contener un símbolo',
	},
	{ re: /[0-9]/, label: 'Debe incluir un número' },
	{
		fn: (value: string, secondValue: string) => value === secondValue,
		label: 'Las contraseñas no coinciden',
	},
]

const validate = (password: string, secondPassword: string) => {
	let multiplier = 0

	requirements.forEach(requirement => {
		if (requirement.re && !requirement.re.test(password)) {
			multiplier += 1
		} else if (requirement.fn && !requirement.fn(password, secondPassword))
			multiplier += 1
	})

	return {
		strength: Math.max(100 - (100 / requirements.length) * multiplier, 10),
		error: requirements.find(r =>
			r.re ? !r.re.test(password) : !r.fn(password, secondPassword)
		),
	}
}

type UpdatePassowordModalProps = {
	opened: ModalProps['opened']
	onClose: ModalProps['onClose']
}

const initialState = {
	first: '',
	second: '',
}

const UpdatePassowordModal: FC<UpdatePassowordModalProps> = props => {
	const userSession = getUserSession()
	const { opened, onClose } = props
	const [passwords, setPasswords] = useState(initialState)
	const { strength, error } = validate(passwords.first, passwords.second)
	const [saveLoading, setSaveLoading] = useState(false)

	const passwordChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target

		setPasswords(passwords => ({
			...passwords,
			[name]: value,
		}))
	}

	const resetPasswords = () => setPasswords(initialState)

	const close = () => {
		onClose()
		setTimeout(() => {
			resetPasswords()
		}, 200)
	}

	const save = async () => {
		if (!userSession) return

		try {
			setSaveLoading(true)
			const response = await updatePasswordRequest({
				password: passwords.first,
				userId: userSession.id,
			})

			notifications.success('Actualización exitosa', response)
			close()
		} catch (error: unknown) {
			const knownError = error as ErrorResponse
			const message = knownError.response?.data.message
				? knownError.response?.data.message
				: knownError.message

			notifications.error('Ocurrió un error', message)
		} finally {
			setSaveLoading(false)
		}
	}

	return (
		<Modal
			size='sm'
			opened={opened}
			onClose={close}
			withCloseButton={false}
			centered
		>
			<Header />
			<PasswordInputs
				onChange={passwordChangeHandler}
				password={passwords.first}
				secondPassword={passwords.second}
				strength={strength}
				error={error?.label}
			/>
			<Footer
				strength={strength}
				save={save}
				close={close}
				loading={saveLoading}
			/>
		</Modal>
	)
}

export default UpdatePassowordModal
