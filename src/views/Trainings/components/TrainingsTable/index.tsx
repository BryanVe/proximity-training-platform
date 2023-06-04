import { CustomTable } from '@/components'
import { getTrainings } from '@/request'
import {
	formatDate,
	getColorForResult,
	getDifferenceFromDates,
	getUserSession,
} from '@/utils'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Badge, Pagination, Text, Tooltip } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import ExtraInfo from '../ExtraInfo'

type TrainingsTableProps = {
	totalTrainings: number
	selectedModule: string
}

const TrainingsTable: FC<TrainingsTableProps> = props => {
	const { totalTrainings, selectedModule } = props
	const userSession = getUserSession()
	const isModuleSelected = selectedModule.length !== 0
	const [selectedTraining, setSelectedTraining] = useState<TrainingDTO>()
	const columns: CustomTableColumns<TrainingDTO> = [
		{
			id: 'id',
			label: 'ID',
		},
		{
			id: 'startDate',
			label: 'Fecha',
			render: date => formatDate(date.startDate),
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
			render: data => getDifferenceFromDates(data.startDate, data.endDate),
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

	const totalPages = Math.floor(totalTrainings / 10) + 1
	const pagination = usePagination({
		initialPage: 1,
		total: totalPages,
	})

	const {
		data: trainings,
		isLoading: areTrainingsLoading,
		error: trainingsError,
	} = useQuery<
		TrainingDTO[] | undefined,
		ErrorResponse,
		TrainingDTO[] | undefined,
		(string | undefined)[]
	>(
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

	return (
		<>
			{isModuleSelected ? (
				<>
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
					<CustomTable<TrainingDTO>
						isLoading={areTrainingsLoading}
						error={trainingsError}
						columns={columns}
						data={trainings}
						miw={1200}
						loadingMessage='Cargando entrenamientos...'
					/>
				</>
			) : (
				<Text size='sm'>No has realizado ningún filtrado todavía</Text>
			)}
			{selectedTraining && <ExtraInfo training={selectedTraining} />}
		</>
	)
}

export default TrainingsTable
