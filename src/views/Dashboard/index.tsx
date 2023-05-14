import { Text, Title, useMantineTheme } from '@mantine/core'
import { Doughnut } from 'react-chartjs-2'
import { ChartData } from 'chart.js'

const Dashboard = () => {
	const theme = useMantineTheme()

	const data: ChartData<'doughnut', number[], string> = {
		labels: ['244', '156', '148', '100', '83', '72', '62'],
		datasets: [
			{
				label: 'My First Dataset',
				data: [244, 156, 148, 100, 83, 72, 62],
				backgroundColor: theme.colors.pink.sort().slice(3),
			},
		],
	}
	return (
		<>
			<Title color='gray.5'>Dashboard</Title>
			<Text>
				Bienvenido al gestor web, aquí podrás visualizar métricas importantes
				del pilotaje
			</Text>
			<Doughnut
				style={{
					width: '100%',
					margin: 'auto',
				}}
				data={data}
				options={{
					plugins: {
						legend: {
							align: 'end',
							labels: {
								usePointStyle: true,
								font: {
									size: 16,
								},
							},
						},
					},
				}}
			/>
			{/* <Flex>
				<Box
					style={{
						flexGrow: 1,
					}}
				>
					<Doughnut
						style={{
							width: '100%',
							margin: 'auto',
						}}
						data={data}
						options={{
							plugins: {
								legend: {
									align: 'end',
									labels: {
										usePointStyle: true,
										font: {
											size: 16,
										},
									},
								},
							},
						}}
					/>
				</Box>
				<Box
					fw={1}
					style={{
						flexGrow: 1,
					}}
				>
					<Doughnut
						style={{
							margin: 'auto',
						}}
						data={data}
						options={{
							plugins: {
								legend: {
									align: 'end',
									labels: {
										usePointStyle: true,
										font: {
											size: 16,
										},
									},
								},
							},
						}}
					/>
				</Box>
			</Flex> */}
		</>
	)
}

export default Dashboard
