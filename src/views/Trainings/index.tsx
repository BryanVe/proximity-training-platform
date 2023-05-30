import { CustomTable } from '@/components'
import { getAvailableModules, getTrainings } from '@/request'
import { formatDate, getDifferenceFromDates, getUserSession } from '@/utils'
import { getColorForResult } from '@/utils/results'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	ActionIcon,
	Badge,
	Grid,
	Select,
	Text,
	Title,
	Tooltip,
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Training = () => {
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
			render: data => (
				<>{getDifferenceFromDates(data.startDate, data.endDate)}</>
			),
		},
		{
			id: 'actions',
			label: 'Acciones',
			render: data => (
				<Tooltip
					label='Ver información extra'
					withArrow
				>
					<ActionIcon
						color='cyan.6'
						radius='xl'
						variant='light'
						onClick={() => setSelectedTraining(data)}
					>
						<FontAwesomeIcon icon={faFile} />
					</ActionIcon>
				</Tooltip>
			),
		},
	]
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

	const [selectedTraining, setSelectedTraining] = useState<TrainingDTO>()

	const selectModule = (value: string | null) => {
		setSelectedTraining(undefined)
		setSelectedModule(value)
	}

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
			{selectedTraining && (
				<Grid
					gutter='xl'
					mt='md'
				>
					<Grid.Col md={6}>
						<Title
							color='gray.8'
							size='h3'
							mb='md'
						>
							Errores críticos
						</Title>
						{selectedTraining.criticalErrors ? (
							JSON.stringify(selectedTraining.criticalErrors)
						) : (
							<Text>No se encontró errores críticos</Text>
						)}
					</Grid.Col>
					<Grid.Col md={6}>
						<Title
							color='gray.8'
							size='h3'
							mb='md'
						>
							EPPs incorrectamente tomados
						</Title>
						{selectedTraining.eppIncorrectamenteTomados ? (
							JSON.stringify(selectedTraining.eppIncorrectamenteTomados)
						) : (
							<Text>No se encontró EPPs incorrectamente tomados</Text>
						)}
					</Grid.Col>
					<Grid.Col md={6}>
						<Title
							color='gray.8'
							size='h3'
							mb='md'
						>
							Errores menores
						</Title>
						{selectedTraining.minorErrors ? (
							JSON.stringify(selectedTraining.minorErrors)
						) : (
							<Text>No se encontró errores menores</Text>
						)}
					</Grid.Col>
					<Grid.Col md={6}>
						<Title
							color='gray.8'
							size='h3'
							mb='md'
						>
							EPPs no tomados
						</Title>
						{selectedTraining.eppNoTomados ? (
							JSON.stringify(selectedTraining.eppNoTomados)
						) : (
							<Text>No se encontró EPPs no tomados</Text>
						)}
					</Grid.Col>
				</Grid>
			)}
		</>
	)
}

export default Training
