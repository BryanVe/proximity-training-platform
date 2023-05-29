import {
	Notification,
	PasswordInput,
	TextInput,
	useMantineTheme,
} from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { CustomButton } from '@/styled.components'
import { Form } from './styled.components'
import { useForm } from '@mantine/form'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authRequest } from '@/request'
import { notifications, setUserSession } from '@/utils'

const getInputErrorMessage = (message: string) => (
	<Notification
		withCloseButton={false}
		icon={<FontAwesomeIcon icon={faXmark} />}
		styles={theme => ({
			root: {
				backgroundColor: theme.colors.red[1],
				boxShadow: 'none',
			},
			icon: {
				backgroundColor: theme.colors.red[7],
				width: theme.spacing.lg,
				height: theme.spacing.lg,
			},
			description: { color: theme.colors.red[7], fontWeight: 600 },
		})}
	>
		{message}
	</Notification>
)

const AuthForm = () => {
	const theme = useMantineTheme()
	const navigate = useNavigate()
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: value => {
				if (!value)
					return getInputErrorMessage('Este campo no puede estar vacío')

				if (!/^\S+@\S+\.\S+$/.test(value))
					return getInputErrorMessage('Ingrese un email válido')

				return null
			},
			password: value =>
				value.length === 0
					? getInputErrorMessage('Este campo no puede estar vacío')
					: null,
		},
	})
	const { mutate: auth, isLoading: isAuthLoading } = useMutation<
		AuthResponse,
		ErrorResponse,
		CredentialsDTO
	>(authRequest, {
		onSuccess: data => {
			const { organization } = data.message
			setUserSession(data.message)

			notifications.success(
				'Inició sesión correctamente',
				`Bienvenido ${organization}`
			)

			navigate('/dashboard', {
				replace: true,
			})
		},
		onError: error => {
			if (error.response)
				notifications.error(
					'Error al iniciar sesión',
					error.response.data.message
				)
		},
	})

	const authButtonColors = {
		bg: theme.colors.red[5],
		hbg: theme.fn.lighten(theme.colors.red[5], 0.1),
		abg: theme.fn.darken(theme.colors.red[5], 0.1),
	}

	return (
		<Form onSubmit={form.onSubmit(values => auth(values))}>
			<TextInput
				w='100%'
				size='md'
				type='email'
				variant='filled'
				placeholder='Email'
				{...form.getInputProps('email', {
					withFocus: false,
				})}
			/>
			<PasswordInput
				w='100%'
				size='md'
				variant='filled'
				placeholder='Contraseña'
				visibilityToggleIcon={({ reveal }) =>
					reveal ? (
						<FontAwesomeIcon icon={faEyeSlash} />
					) : (
						<FontAwesomeIcon icon={faEye} />
					)
				}
				{...form.getInputProps('password', {
					withFocus: false,
				})}
			/>
			<CustomButton
				type='submit'
				size='md'
				radius='sm'
				bg={authButtonColors.bg}
				hbg={authButtonColors.hbg}
				abg={authButtonColors.abg}
				loading={isAuthLoading}
			>
				Iniciar sesión
			</CustomButton>
		</Form>
	)
}

export default AuthForm
