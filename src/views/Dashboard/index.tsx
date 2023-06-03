import { getUserSession } from '@/utils'
import { Grid, Text, Title, useMantineTheme } from '@mantine/core'
import {
	DashboardBar,
	LastTrainings,
	MostCommonResults,
	MostUsedModules,
} from './components'

const Dashboard = () => {
	const userSession = getUserSession()
	const theme = useMantineTheme()

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
					<LastTrainings />
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
