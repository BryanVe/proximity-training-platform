import { CustomTable } from '@/components'
import { constants } from '@/config'
import {
	getLastTrainingsRequest,
	getMostCommonResultsRequest,
	getMostUsedModulesRequest,
} from '@/request'
import { formatDate, getUserSession } from '@/utils'
import { getColorForResult } from '@/utils/results'
import { Badge, Grid, Text, Title, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { DashboardBar, DashboardDoughnut } from './components'

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
	const { data: mostUsedModules } = useQuery(
		['mostUsedModules', userSession?.organization],
		({ queryKey }) => {
			if (!queryKey[1]) return

			return getMostUsedModulesRequest({
				organization: queryKey[1],
				limit: constants.MAX_CHART_RESULTS,
			})
		},
		{
			refetchOnWindowFocus: false,
		}
	)
	const { data: mostCommonResults } = useQuery(
		['mostCommonResults', userSession?.organization],
		({ queryKey }) => {
			if (!queryKey[1]) return

			return getMostCommonResultsRequest({
				organization: queryKey[1],
				limit: constants.MAX_CHART_RESULTS,
			})
		},
		{
			refetchOnWindowFocus: false,
		}
	)
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

	const mostUsedModulesData: DoughnutProps['data'] = {
		labels: mostUsedModules?.message.map(m => m.module),
		datasets: [
			{
				data: mostUsedModules?.message.map(m => m.quantity),
				backgroundColor: mostUsedModules?.message.map((_, index) =>
					theme.fn.lighten(theme.colors.pink[5], 0.1 * index)
				),
			},
		],
	}

	const mostCommonResultsData: DoughnutProps['data'] = {
		labels: mostCommonResults?.message.map(m => m.result),
		datasets: [
			{
				data: mostCommonResults?.message.map(m => m.percentage),
				backgroundColor: mostCommonResults?.message.map((_, index) =>
					theme.fn.lighten(theme.colors.yellow[6], 0.1 * index)
				),
			},
		],
	}

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
					<DashboardDoughnut
						title='Módulos Más Utilizados'
						data={mostUsedModulesData}
						cutout='60%'
						dataLabelColor={theme.white}
					/>
				</Grid.Col>
				<Grid.Col md={6}>
					<DashboardDoughnut
						isPercentage
						title='Resultados Más Comunes'
						data={mostCommonResultsData}
						cutout='40%'
						dataLabelColor={theme.colors.gray[8]}
					/>
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
