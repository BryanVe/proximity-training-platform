import { getUserSession } from '@/utils'
import { Grid, PasswordInput, TextInput, Title } from '@mantine/core'

const Profile = () => {
	const userSession = getUserSession()

	return (
		<>
			<Title color='gray.8'>Perfil</Title>
			<Grid>
				<Grid.Col>
					<TextInput
						disabled
						label='ID'
						placeholder='ID'
						defaultValue={userSession?.id || ''}
					/>
					<TextInput
						disabled
						label='Nombre'
						placeholder='Nombre'
						defaultValue={userSession?.user || ''}
					/>
					<TextInput
						disabled
						label='Organización'
						placeholder='Organización'
						defaultValue={userSession?.organization || ''}
					/>
					<TextInput
						disabled
						label='Email'
						placeholder='Email'
						defaultValue={userSession?.email || ''}
					/>
					<PasswordInput
						disabled
						label='Contraseña'
						placeholder='Contraseña'
						defaultValue='aaaaaaaa'
					/>
				</Grid.Col>
			</Grid>
		</>
	)
}

export default Profile
