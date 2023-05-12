import {
	Box,
	Image,
	Notification,
	PasswordInput,
	rem,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
// import { faEnvelope, faLock, faXmark } from '@fortawesome/free-solid-svg-icons'
import proximityWhiteLogo from '@/assets/images/proximity_white_logo.png'
import { CustomButton } from '@/components'
import { LoginForm } from './components'
import { useForm } from '@mantine/form'

const LoginView = () => {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: value =>
				/^\S+@\S+$/.test(value) ? null : (
					<Text color='red.9'>Email inválido</Text>
				),
			password: value =>
				value.length !== 0 ? null : (
					<Notification
						withCloseButton={false}
						styles={theme => ({
							root: {
								backgroundColor: theme.colors.gray[5],
								padding: rem(1),
								paddingLeft: theme.spacing.lg,

								'&::before': { backgroundColor: theme.colors.red[6] },
							},
							icon: {
								backgroundColor: 'transparent',
							},
							description: { color: theme.colors.red[6] },
						})}
					>
						Email inválido
					</Notification>
				),
		},
	})

	return (
		<LoginForm onSubmit={form.onSubmit(values => console.log(values))}>
			<Box p='md'>
				<Image
					maw={110}
					mx='auto'
					alt='Proximity Logo'
					src={proximityWhiteLogo}
					mt={rem(45)}
					mb='sm'
				/>
				<Title
					order={1}
					size='h2'
					ta='center'
				>
					PROXIMITY
				</Title>
				<Title
					order={2}
					size='h4'
					mb='xl'
					weight={500}
					ta='center'
				>
					Training Platform
				</Title>
				<Text
					mt={rem(45)}
					mb='xl'
					ta='center'
				>
					Accede al <b>Portal de Entrenamiento</b>
				</Text>
				<TextInput
					w='100%'
					mb='md'
					placeholder='Email'
					{...form.getInputProps('email')}
				/>
				<PasswordInput
					w='100%'
					placeholder='Contraseña'
					visibilityToggleIcon={({ reveal }) =>
						reveal ? (
							<FontAwesomeIcon icon={faEyeSlash} />
						) : (
							<FontAwesomeIcon icon={faEye} />
						)
					}
					{...form.getInputProps('password')}
				/>
			</Box>
			<CustomButton type='submit'>Iniciar sesión</CustomButton>
		</LoginForm>
	)
}

export default LoginView
