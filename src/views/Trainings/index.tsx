import { constants } from '@/config'
import { getAvailableModules } from '@/request'
import { getUserSession } from '@/utils'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Grid, Loader, Select, Text, Title } from '@mantine/core'
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
	const [selectedOrder, setSelectedOrder] = useState(
		constants.TRAINING_ORDERS[0].value
	)
	const isModuleSelected = selectedModule.length !== 0
	const totalTrainings =
		availableModules && isModuleSelected ? availableModules[selectedModule] : 0

	const selectModule = (value: string) => setSelectedModule(value)
	const selectOrder = (value: string) => setSelectedOrder(value)

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
			<Title>Entrenamientos</Title>
			<Text>
				Selecciona un módulo para buscar los entrenamientos, puedes también
				ordenarlos utilizando una de las opciones disponibles.
			</Text>
			<Grid
				mt='md'
				mb='xs'
				justify='space-between'
			>
				<Grid.Col
					md={7}
					lg={5}
					xl={4}
				>
					<Select
						disabled={areAvailableModulesLoading}
						icon={areAvailableModulesLoading ? <Loader size='xs' /> : null}
						placeholder='Módulo'
						data={availableModulesNames}
						value={selectedModule}
						onChange={selectModule}
					/>
				</Grid.Col>
				{isModuleSelected && (
					<Grid.Col md='content'>
						<Select
							placeholder='Ordenar por'
							data={constants.TRAINING_ORDERS}
							value={selectedOrder}
							onChange={selectOrder}
						/>
					</Grid.Col>
				)}
			</Grid>
			<TrainingsTable
				key={selectedModule}
				selectedModule={selectedModule}
				selectedOrder={selectedOrder}
				totalTrainings={totalTrainings}
			/>
		</>
	)
}

export default Training
