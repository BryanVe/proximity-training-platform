import { CustomTable } from '@/components'
import { constants } from '@/config'
import { getLastTrainingsRequest } from '@/request'
import { formatDate, getColorForResult, getUserSession } from '@/utils'
import { Badge, Flex, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

const columns: CustomTableColumns<LastTrainingDTO> = [
	{
		id: 'startDate',
		label: 'Fecha',
		render: date => formatDate(date.startDate),
	},
	{
		id: 'module',
		label: 'Módulo',
	},
	{
		id: 'result',
		label: 'Resultado',
		render: data => (
			<Badge color={getColorForResult(data.result)}>{data.result}</Badge>
		),
	},
]

const LastTrainings = () => {
	const userSession = getUserSession()

	const {
		data: lastTrainings,
		isLoading: areLastTrainingsLoading,
		error: lastTrainingsError,
	} = useQuery<
		LastTrainingDTO[] | undefined,
		ErrorResponse,
		LastTrainingDTO[] | undefined,
		(string | undefined)[]
	>(
		['lastTrainings', userSession?.organization],
		({ queryKey }) => {
			if (!queryKey[1]) return

			return getLastTrainingsRequest({
				organization: queryKey[1],
				limit: constants.MAX_CHART_RESULTS,
			})
		},
		{
			refetchOnWindowFocus: false,
		}
	)

	return (
		<Flex
			direction='column'
			gap='md'
		>
			<Title size='h3'>Últimos Entrenamientos</Title>
			<CustomTable<LastTrainingDTO>
				isLoading={areLastTrainingsLoading}
				columns={columns}
				data={lastTrainings}
				miw={700}
				error={lastTrainingsError}
				loadingMessage='Cargando los últimos entrenamientos...'
			/>
		</Flex>
	)
}

export default LastTrainings
