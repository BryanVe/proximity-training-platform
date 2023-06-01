import { getAvailableModules } from '@/request'
import { getUserSession } from '@/utils'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Loader, Select, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { TrainingsTable } from './components'

const Training = () => {
	const userSession = getUserSession()
	const {
		data: availableModules,
		isLoading: areAvailableModulesLoading,
		error: availableModulesError,
	} = useQuery<
		Record<string, number> | undefined,
		ErrorResponse,
		Record<string, number> | undefined,
		(string | undefined)[]
	>(
		['trainings', userSession?.organization],
		({ queryKey }) => {
			if (!queryKey[1]) return

			return getAvailableModules({
				organization: queryKey[1],
			})
		},
		{
			refetchOnWindowFocus: false,
		}
	)
	const availableModulesNames = Object.keys(availableModules || {})

	const [selectedModule, setSelectedModule] = useState('')
	const isModuleSelected = selectedModule.length !== 0
	const totalTrainings =
		availableModules && isModuleSelected ? availableModules[selectedModule] : 0

	const selectModule = (value: string) => setSelectedModule(value)

	return (
		<>
			{availableModulesError && (
				<Alert
					mb='md'
					styles={{
						icon: {
							width: 'auto',
							height: 'auto',
							marginTop: 0,
						},
						title: {
							marginBottom: 0,
						},
					}}
					icon={<FontAwesomeIcon icon={faTriangleExclamation} />}
					title='Error al obtener los módulos disponibles'
				>
					{availableModulesError?.response?.data.message}
				</Alert>
			)}
			<Title color='gray.8'>Entrenamientos</Title>
			<Select
				disabled={areAvailableModulesLoading}
				icon={areAvailableModulesLoading ? <Loader size='xs' /> : null}
				my='md'
				maw={400}
				label='Selecciona un módulo para realizar el filtrado'
				placeholder='Módulo'
				data={availableModulesNames}
				value={selectedModule}
				onChange={selectModule}
			/>
			<TrainingsTable
				key={selectedModule}
				selectedModule={selectedModule}
				totalTrainings={totalTrainings}
			/>
		</>
	)
}

export default Training
