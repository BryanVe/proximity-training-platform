import { getAvailableModules, getTrainings } from '@/request'
import { getUserSession } from '@/utils'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Loader, Pagination, Select, Title } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
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
	const [selectedModule, setSelectedModule] = useState('')
	const isModuleSelected = selectedModule.length !== 0
	const availableModulesNames = Object.keys(availableModules || {})
	const totalTrainings =
		availableModules && isModuleSelected ? availableModules[selectedModule] : 0
	const totalPages = Math.floor(totalTrainings / 10) + 1
	const pagination = usePagination({
		initialPage: 1,
		total: totalPages,
	})

	const { data: trainings, isLoading: areTrainingsLoading } = useQuery(
		[
			'trainings',
			userSession?.organization,
			selectedModule,
			pagination.active.toString(),
		],
		({ queryKey }) => {
			if (!queryKey[1] || !queryKey[2] || !queryKey[3]) return

			return getTrainings({
				organization: queryKey[1],
				module: queryKey[2],
				limit: 10,
				offset: 10 * (parseInt(queryKey[3]) - 1),
			})
		},
		{
			enabled: isModuleSelected,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	)

	const selectModule = (value: string) => {
		pagination.first()
		setSelectedModule(value)
	}

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
				data={availableModulesNames || []}
				value={selectedModule}
				onChange={selectModule}
			/>
			{isModuleSelected && (
				<Pagination
					value={pagination.active}
					onChange={pagination.setPage}
					total={totalPages}
					size='sm'
					mb='xs'
					siblings={0}
					style={{
						justifyContent: 'flex-end',
					}}
				/>
			)}
			<TrainingsTable
				key={selectedModule}
				isModuleSelected={isModuleSelected}
				isLoading={isModuleSelected && areTrainingsLoading}
				trainings={trainings}
			/>
		</>
	)
}

export default Training
