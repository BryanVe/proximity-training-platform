import { getUserSession } from '@/utils'
import { Grid, Text, Title } from '@mantine/core'
import { GeneralInfo, LoginCredentials } from './components'

const Profile = () => {
	const userSession = getUserSession()

	return (
		<>
			<Title>Perfil</Title>
			<Title size='h2'>{userSession?.organization}</Title>
			<Text>
				Aquí podrás visualizar toda la información relacionada a tu usuario
			</Text>
			<Grid
				mt='xs'
				gutter='xl'
			>
				<Grid.Col md={6}>
					<LoginCredentials />
				</Grid.Col>
				<Grid.Col md={6}>
					<GeneralInfo />
				</Grid.Col>
			</Grid>
		</>
	)
}

export default Profile
