import { CustomTable } from '@/components'
import { getAvailableModules, getTrainings } from '@/request'
import { formatDate, getDifferenceFromDates, getUserSession } from '@/utils'
import { getColorForResult } from '@/utils/results'
import { Badge, Select, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const columns: CustomTableColumns<TrainingDTO[]> = [
	{
		id: 'startDate',
		label: 'Fecha',
		render: date => <>{formatDate(date.startDate)}</>,
	},
	{ id: 'organization', label: 'Nombre' },
	{
		id: 'dni',
		label: 'DNI',
	},
	{
		id: 'module',
		label: 'Módulo',
	},
	{
		id: 'scenario',
		label: 'Escenario',
	},
	{
		id: 'observations',
		label: 'Observaciones',
	},
	{
		id: 'result',
		label: 'Resultado',
		render: data => (
			<Badge color={getColorForResult(data.result)}>{data.result}</Badge>
		),
	},
	{
		id: 'time',
		label: 'Tiempo',
		render: data => <>{getDifferenceFromDates(data.startDate, data.endDate)}</>,
	},
]

const Training = () => {
	const userSession = getUserSession()
	const { data: availableModules } = useQuery(
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

	const [selectedModule, setSelectedModule] = useState<string | null>()
	const selectedTrainingModule = selectedModule || availableModules?.message[0]

	const { data: trainings } = useQuery(
		['trainings', userSession?.organization, selectedTrainingModule],
		({ queryKey }) => {
			if (!queryKey[1] || !queryKey[2]) return

			return getTrainings({
				organization: queryKey[1],
				module: queryKey[2],
				limit: 10,
				offset: 0,
			})
		},
		{
			enabled: Boolean(availableModules),
			refetchOnWindowFocus: false,
		}
	)

	const selectModule = (value: string | null) => setSelectedModule(value)

	return (
		<>
			<Title color='gray.8'>Entrenamientos</Title>
			<Select
				mt='md'
				maw={300}
				label='Selecciona un módulo para realizar el filtrado'
				placeholder='Módulo'
				data={availableModules?.message || []}
				value={selectedTrainingModule}
				onChange={selectModule}
			/>
			<CustomTable<TrainingDTO[]>
				columns={columns}
				data={trainings?.message || []}
				miw={1200}
			/>
		</>
	)
}

export default Training
