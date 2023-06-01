import { CustomTable } from '@/components'
import { formatDate, getColorForResult, getDifferenceFromDates } from '@/utils'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Badge, Flex, Loader, Text, Tooltip } from '@mantine/core'
import { FC, useState } from 'react'
import ExtraInfo from '../ExtraInfo'

type TrainingsTableProps = {
	isModuleSelected: boolean
	isLoading: boolean
	trainings?: TrainingDTO[]
}

const TrainingsTable: FC<TrainingsTableProps> = props => {
	const { isLoading, isModuleSelected, trainings } = props
	const [selectedTraining, setSelectedTraining] = useState<TrainingDTO>()
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

	return (
		<>
			{isModuleSelected ? (
				isLoading ? (
					<Flex
						justify='center'
						p='md'
					>
						<Loader />
					</Flex>
				) : (
					<CustomTable<TrainingDTO[]>
						columns={columns}
						data={trainings}
						miw={1200}
					/>
				)
			) : (
				<Text size='sm'>No has realizado ningún filtrado todavía</Text>
			)}
			{selectedTraining && <ExtraInfo training={selectedTraining} />}
		</>
	)
}

export default TrainingsTable
