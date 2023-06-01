import { CustomTable } from '@/components'
import { constants } from '@/config'
import { getAvailableModules, getTrainings } from '@/request'
import { formatDate, getDifferenceFromDates, getUserSession } from '@/utils'
import { getColorForResult } from '@/utils/results'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	ActionIcon,
	Badge,
	Grid,
	Loader,
	Pagination,
	Select,
	Text,
	Title,
	Tooltip,
} from '@mantine/core'
import { usePagination } from '@mantine/hooks'
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
						color='red.6'
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
	const { data: availableModules = {}, isLoading: areAvailableModulesLoading } =
		useQuery(
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
	const availableModulesKeys = Object.keys(availableModules)
	const availableModulesFirstKey = availableModulesKeys[0]
	const areAvailableModulesKeysEmpty = availableModulesKeys.length === 0

	const [selectedModule, setSelectedModule] = useState('')
	const _selectedModule = selectedModule || availableModulesFirstKey
	const totalTrainings = availableModules[_selectedModule] || 0
	const totalPages = Math.floor(totalTrainings / 10) + 1
	const pagination = usePagination({
		initialPage: 1,
		total: totalTrainings,
	})

	const { data: trainings, isLoading: areTrainingsLoading } = useQuery(
		[
			'trainings',
			userSession?.organization,
			_selectedModule,
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
			enabled: !areAvailableModulesKeysEmpty,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	)

	const [selectedTraining, setSelectedTraining] = useState<TrainingDTO>()

	const selectModule = (value: string) => {
		pagination.first()
		setSelectedTraining(undefined)
		setSelectedModule(value)
	}

	const setPage = (value: number) => {
		setSelectedTraining(undefined)
		pagination.setPage(value)
	}

	return (
		<>
			<Title color='gray.8'>Entrenamientos</Title>
			<Select
				disabled={areAvailableModulesLoading}
				icon={areAvailableModulesLoading ? <Loader size='xs' /> : null}
				my='md'
				maw={400}
				label='Selecciona un módulo para realizar el filtrado'
				placeholder='Módulo'
				data={availableModulesKeys || []}
				value={_selectedModule}
				onChange={selectModule}
			/>
			<Pagination
				value={pagination.active}
				onChange={setPage}
				total={totalPages}
				size='sm'
				mb='xs'
				siblings={0}
				style={{
					justifyContent: 'flex-end',
				}}
			/>
			<CustomTable<TrainingDTO[]>
				isLoading={!areAvailableModulesKeysEmpty && areTrainingsLoading}
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
							{selectedTraining.module === constants.SCOOP_MODULE
								? constants.SCOOP_MODULE_NAMES.criticalErrors
								: constants.REGULAR_MODULE_NAMES.criticalErrors}
						</Title>
						{selectedTraining.criticalErrors ? (
							JSON.stringify(selectedTraining.criticalErrors)
						) : (
							<Text>No se encontró resultados</Text>
						)}
					</Grid.Col>
					<Grid.Col md={6}>
						<Title
							color='gray.8'
							size='h3'
							mb='md'
						>
							{selectedTraining.module === constants.SCOOP_MODULE
								? constants.SCOOP_MODULE_NAMES.eppIncorrectamenteTomados
								: constants.REGULAR_MODULE_NAMES.eppIncorrectamenteTomados}
						</Title>
						{selectedTraining.eppIncorrectamenteTomados ? (
							JSON.stringify(selectedTraining.eppIncorrectamenteTomados)
						) : (
							<Text>No se encontró resultados</Text>
						)}
					</Grid.Col>
					<Grid.Col md={6}>
						<Title
							color='gray.8'
							size='h3'
							mb='md'
						>
							{selectedTraining.module === constants.SCOOP_MODULE
								? constants.SCOOP_MODULE_NAMES.minorErrors
								: constants.REGULAR_MODULE_NAMES.minorErrors}
						</Title>
						{selectedTraining.minorErrors ? (
							JSON.stringify(selectedTraining.minorErrors)
						) : (
							<Text>No se encontró resultados</Text>
						)}
					</Grid.Col>
					<Grid.Col md={6}>
						<Title
							color='gray.8'
							size='h3'
							mb='md'
						>
							{selectedTraining.module === constants.SCOOP_MODULE
								? constants.SCOOP_MODULE_NAMES.eppNoTomados
								: constants.REGULAR_MODULE_NAMES.eppNoTomados}
						</Title>
						{selectedTraining.eppNoTomados ? (
							JSON.stringify(selectedTraining.eppNoTomados)
						) : (
							<Text>No se encontró resultados</Text>
						)}
					</Grid.Col>
				</Grid>
			)}
		</>
	)
}

export default Training
