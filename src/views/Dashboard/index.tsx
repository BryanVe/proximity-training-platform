import { CustomTable } from '@/components'
import { constants } from '@/config'
import { getMostUsedModulesRequest } from '@/request'
import { getUserSession } from '@/utils'
import { Badge, Grid, Text, Title, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { DashboardBar, DashboardDoughnut } from './components'

const mockedData4: LastTrainingData = new Array(5).fill('').map((_, index) => ({
	id: `${index + 1}`,
	date: 'May 11, 2021, 10:41:52 AM',
	company: '<nombre_del_cliente>',
	training: 'Escalera Telescópica',
	status: 'COMPLETADO CON ERRORES',
}))

const columns: CustomTableColumns<LastTrainingData> = [
	{ id: 'date', label: 'Fecha' },
	{ id: 'company', label: 'Empresa' },
	{
		id: 'training',
		label: 'Entrenamiento',
	},
	{
		id: 'status',
		label: 'Estado',
		render: data => <Badge>{data.status}</Badge>,
	},
]

const Dashboard = () => {
	const userSession = getUserSession()
	const theme = useMantineTheme()
	const { data: mostUsedModules } = useQuery(['mostUsedModules'], () => {
		if (!userSession) return

		return getMostUsedModulesRequest({
			organization: userSession.organization,
			limit: constants.MAX_CHART_RESULTS,
		})
	})

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

	const mockedData2: DoughnutProps['data'] = {
		labels: [
			'Completado con Errores',
			'Completado',
			'No Completado',
			'Interrumpido',
			'Aprobado',
			'Desaprobado',
			'Iniciado',
		],
		datasets: [
			{
				data: [32.8, 16.8, 13.8, 11.1, 9.7, 7.5, 8.3],
				backgroundColor: theme.colors.yellow.sort().slice(3),
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
						data={mockedData2}
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
					<CustomTable<LastTrainingData>
						columns={columns}
						data={mockedData4}
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
