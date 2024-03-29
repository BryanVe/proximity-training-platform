import { Box, Image, Text, Title } from '@mantine/core'
import { AuthForm } from './components'
import { Wrapper, AuthContainer } from './styled.components'
import proximityLogo from '@/assets/images/proximity_logo.png'
import { Navigate } from 'react-router-dom'
import { getUserSession } from '@/utils'

const AuthView = () => {
	const userSession = getUserSession()

	if (userSession)
		return (
			<Navigate
				replace
				to='/dashboard'
			/>
		)

	return (
		<Wrapper>
			<AuthContainer
				shadow='xs'
				p='md'
			>
				<Box>
					<Image
						maw={200}
						mx='auto'
						alt='Proximity Logo'
						src={proximityLogo}
					/>
					<Title
						order={2}
						size='h4'
						weight={500}
						ta='center'
					>
						Training Platform
					</Title>
				</Box>
				<Text ta='center'>
					Accede al <b>Portal de Entrenamiento</b>
				</Text>
				<AuthForm />
			</AuthContainer>
		</Wrapper>
	)
}

export default AuthView
