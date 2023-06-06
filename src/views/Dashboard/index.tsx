import { getUserSession } from '@/utils'
import { Grid, Text, Title } from '@mantine/core'
import {
	LastTrainings,
	MostCommonResults,
	MostUsedModules,
	TrainingsQuantity,
} from './components'

const Dashboard = () => {
	const userSession = getUserSession()

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
			<Grid
				gutter='xl'
				mt='md'
			>
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
					<TrainingsQuantity />
				</Grid.Col>
			</Grid>
		</>
	)
}

export default Dashboard
