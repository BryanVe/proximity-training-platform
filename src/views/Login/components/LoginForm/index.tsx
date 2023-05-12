import {
	createStyles,
	Notification,
	PasswordInput,
	rem,
	TextInput,
} from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { CustomButton } from '@/styled.components'
import { Form } from './styled.components'
import { useForm } from '@mantine/form'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

const loginButtonColors = {
	bg: '#f16066',
	hbg: '#f06c71',
	abg: '#f0545a',
}

const useStyles = createStyles(() => ({
	input: {
		backgroundColor: '#f5f5f5',
	},
}))

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

const LoginForm = () => {
	const { classes } = useStyles()
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

	const login = (values: typeof form.values) => {
		try {
			// TODO: implement fetching login to backend
			if (values.email === 'test@test.com' && values.password === 'test') {
				notifications.show({
					title: 'Inició sesión correctamente',
					message: 'Bienvenido <nombre_de_empresa>',
					icon: <FontAwesomeIcon icon={faCheck} />,
					styles: theme => ({
						root: {
							backgroundColor: theme.colors.green[0],
							border: `${rem(1)} solid ${theme.colors.green[7]}`,
							boxShadow: 'none',
						},
						icon: {
							backgroundColor: theme.colors.green[7],
						},
						title: {
							fontWeight: 600,
							color: theme.colors.green[7],
							fontSize: theme.fontSizes.md,
						},
					}),
				})

				return navigate('/dashboard')
			}

			notifications.show({
				title: 'Error al iniciar sesión',
				message: 'Ocurrió el siguiente error: ....',
				icon: <FontAwesomeIcon icon={faXmark} />,
				styles: theme => ({
					root: {
						backgroundColor: theme.colors.red[0],
						border: `${rem(1)} solid ${theme.colors.red[7]}`,
						boxShadow: 'none',
					},
					icon: {
						backgroundColor: theme.colors.red[7],
					},
					title: {
						fontWeight: 600,
						color: theme.colors.red[7],
						fontSize: theme.fontSizes.md,
					},
				}),
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form onSubmit={form.onSubmit(login)}>
			<TextInput
				w='100%'
				size='md'
				type='email'
				variant='filled'
				placeholder='Email'
				classNames={classes}
				{...form.getInputProps('email')}
			/>
			<PasswordInput
				w='100%'
				size='md'
				variant='filled'
				placeholder='Contraseña'
				classNames={classes}
				visibilityToggleIcon={({ reveal }) =>
					reveal ? (
						<FontAwesomeIcon icon={faEyeSlash} />
					) : (
						<FontAwesomeIcon icon={faEye} />
					)
				}
				{...form.getInputProps('password')}
			/>
			<CustomButton
				type='submit'
				size='md'
				radius='sm'
				bg={loginButtonColors.bg}
				hbg={loginButtonColors.hbg}
				abg={loginButtonColors.abg}
			>
				Iniciar sesión
			</CustomButton>
		</Form>
	)
}

export default LoginForm
