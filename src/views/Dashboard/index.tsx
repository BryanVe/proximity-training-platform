import { CustomTable } from '@/components'
import { constants } from '@/config'
import { getLastTrainingsRequest } from '@/request'
import { formatDate, getUserSession } from '@/utils'
import { getColorForResult } from '@/utils/results'
import { Badge, Grid, Text, Title, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { DashboardBar, MostCommonResults, MostUsedModules } from './components'

const columns: CustomTableColumns<LastTrainingDTO[]> = [
	{
		id: 'startDate',
		label: 'Fecha',
		render: date => <>{formatDate(date.startDate)}</>,
	},
	{ id: 'organization', label: 'Nombre' },
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

const Dashboard = () => {
	const userSession = getUserSession()
	const theme = useMantineTheme()

	const { data: lastTrainings } = useQuery(
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

	const mockedData3: BarProps['data'] = {
		labels: ['A', 'B', 'C'],
		datasets: [
			{
				data: [537, 197, 116],
				backgroundColor: [
					theme.colors.gray[4],
					theme.colors.gray[4],
					theme.colors.gray[4],
				],
			},
		],
	}

	return (
		<>
			<Title color='gray.8'>Dashboard</Title>
			{userSession && (
				<Title
					color='gray.8'
					size='h2'
				>
					{userSession.organization}
				</Title>
			)}
			<Text>
				Bienvenido al gestor web, aquí podrás visualizar métricas importantes
				del pilotaje
			</Text>
			<Grid gutter='xl'>
				<Grid.Col md={6}>
					<MostUsedModules />
				</Grid.Col>
				<Grid.Col md={6}>
					<MostCommonResults />
				</Grid.Col>
				<Grid.Col md={6}>
					<Title
						color='gray.8'
						size='h3'
						mb='md'
					>
						Últimos Entrenamientos
					</Title>
					<CustomTable<LastTrainingDTO[]>
						columns={columns}
						data={lastTrainings?.message || []}
						miw={700}
					/>
				</Grid.Col>
				<Grid.Col md={6}>
					<Title
						color='gray.8'
						size='h3'
						mb='md'
					>
						Cantidad de Entrenamientos
					</Title>
					<DashboardBar data={mockedData3} />
				</Grid.Col>
			</Grid>
		</>
	)
}

export default Dashboard
