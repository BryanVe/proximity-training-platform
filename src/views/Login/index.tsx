import { Box, Image, Text, Title } from '@mantine/core'
import { LoginForm } from './components'
import { Wrapper, LoginContainer } from './styled.components'
import proximityLogo from '@/assets/images/proximity_logo.png'

const LoginView = () => (
	<Wrapper>
		<LoginContainer
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
			<LoginForm />
		</LoginContainer>
	</Wrapper>
)

export default LoginView
