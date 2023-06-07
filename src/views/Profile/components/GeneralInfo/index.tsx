import { getUserSession } from '@/utils'
import { TextInput, Title } from '@mantine/core'

const GeneralInfo = () => {
	const userSession = getUserSession()

	return (
		<>
			<Title size='h3'>Información general</Title>
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
		</>
	)
}

export default GeneralInfo
