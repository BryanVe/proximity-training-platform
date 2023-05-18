import { Box, Table, useMantineTheme } from '@mantine/core'
import { FC } from 'react'

type DashboardTableProps = {
	// eslint-disable-next-line
	data: any
}

const DashboardTable: FC<DashboardTableProps> = props => {
	const { data } = props
	const theme = useMantineTheme()

	// eslint-disable-next-line
	const rows = data.map((element: any) => (
		<tr key={element.id}>
			<td
				style={{
					borderTop: 'none',
				}}
			>
				{element.date}
			</td>
			<td
				style={{
					borderTop: 'none',
				}}
			>
				{element.company}
			</td>
			<td
				style={{
					borderTop: 'none',
				}}
			>
				{element.training}
			</td>
			<td
				style={{
					borderTop: 'none',
				}}
			>
				{element.status}
			</td>
		</tr>
	))

	return (
		<Box
			style={{
				overflow: 'auto',
				margin: `${theme.spacing.sm} 0`,
			}}
		>
			<Table miw={600}>
				<thead>
					<tr>
						<th
							style={{
								borderBottomColor: theme.colors.gray[0],
							}}
						>
							Fecha
						</th>
						<th
							style={{
								borderBottomColor: theme.colors.gray[0],
							}}
						>
							Cliente
						</th>
						<th
							style={{
								borderBottomColor: theme.colors.gray[0],
							}}
						>
							Entrenamiento
						</th>
						<th
							style={{
								borderBottomColor: theme.colors.gray[0],
							}}
						>
							Estado
						</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</Box>
	)
}

export default DashboardTable
