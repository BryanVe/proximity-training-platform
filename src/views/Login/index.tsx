import { Flex, Image, rem, Text, TextInput, Title } from '@mantine/core'
import proximityWhiteLogo from '@/assets/images/proximity_white_logo.png'
import { CustomButton } from '@/components'

const LoginView = () => {
	return (
		<div
			style={{
				display: 'grid',
				position: 'absolute',
				backgroundColor: 'red',
				height: 500,
				width: '90%',
				maxWidth: 320,
				transform: 'translate(-50%, -50%)',
				left: '50%',
				top: '50%',
				borderRadius: 40,
				color: 'white',
				background:
					'linear-gradient(135deg, rgba(235,28,133,1) 0%, rgba(248,158,74,1) 100%)',
			}}
		>
			<Flex
				direction='column'
				align='center'
				mb='md'
				p='md'
			>
				<Image
					maw={110}
					alt='Proximity Logo'
					src={proximityWhiteLogo}
					mb='sm'
					mt='xl'
				/>
				<Title
					order={1}
					size='h2'
				>
					PROXIMITY
				</Title>
				<Title
					order={2}
					size='h4'
					mb='xl'
					weight={500}
				>
					Training Platform
				</Title>
				<Text
					mb='xl'
					mt={rem(40)}
				>
					Accede al <b>Portal de Entrenamiento</b>
				</Text>
				<TextInput
					placeholder='Email'
					w='100%'
					mb='md'
				/>
				<TextInput
					placeholder='Contraseña'
					w='100%'
				/>
			</Flex>
			<CustomButton>Iniciar sesión</CustomButton>
		</div>
	)
}

export default LoginView
