import { Box, Grid, rem, Text, Title, useMantineTheme } from '@mantine/core'
import { ChartData } from 'chart.js'
import { DashboardDoughnut } from './components'

const Dashboard = () => {
	const theme = useMantineTheme()

	const mockedData1: ChartData<'doughnut', number[], string> = {
		labels: [
			'Trabajos en Altura',
			'Espacios Confinados',
			'Zanjas y Excavaciones',
			'Trabajos en Caliente',
			'Desatado de Rocas',
			'Intervenciones Críticas',
			'Inducción de Seguridad',
		],
		datasets: [
			{
				data: [244, 156, 148, 100, 83, 72, 62],
				backgroundColor: theme.colors.pink.sort().slice(3),
			},
		],
	}

	const mockedData2: ChartData<'doughnut', number[], string> = {
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

	return (
		<Box
			maw={rem(1200)}
			pb={rem(150)}
			m='auto'
		>
			<Title color='gray.5'>Dashboard</Title>
			<Text>
				Bienvenido al gestor web, aquí podrás visualizar métricas importantes
				del pilotaje
			</Text>
			<Grid>
				<Grid.Col md={6}>
					<DashboardDoughnut
						title='Módulos Más Utilizados'
						data={mockedData1}
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
						dataLabelColor={theme.colors.gray[5]}
					/>
				</Grid.Col>
			</Grid>
		</Box>
	)
}

export default Dashboard
