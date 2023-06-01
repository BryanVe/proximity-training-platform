import { Flex, Loader, Table, TableProps } from '@mantine/core'
import { TableContainer } from './styled.components'

type CustomTableProps<T> = {
	data: T
	columns: CustomTableColumns<T>
	miw?: TableProps['miw']
	isLoading?: boolean
}

function CustomTable<T extends CustomTableDefaultData>(
	props: CustomTableProps<T>
) {
	const { columns, data, miw, isLoading } = props
	const isEmpty = data.length === 0

	console.log({
		columns,
		data,
		miw,
		isLoading,
	})

	return (
		<>
			<TableContainer>
				<Table
					striped
					highlightOnHover
					miw={miw}
				>
					<thead>
						<tr>
							{columns.map(column => (
								<th key={column.id.toString()}>{column.label}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{isLoading
							? isEmpty
								? null
								: // add skeleton
								  data.map(item => (
										<tr key={item.id}>
											{columns.map(column => (
												<td
													key={column.id.toString()}
													style={{
														borderTop: 'none',
													}}
												>
													{column.render
														? column.render(item)
														: item[column.id]}
												</td>
											))}
										</tr>
								  ))
							: data.map(item => (
									<tr key={item.id}>
										{columns.map(column => (
											<td
												key={column.id.toString()}
												style={{
													borderTop: 'none',
												}}
											>
												{column.render ? column.render(item) : item[column.id]}
											</td>
										))}
									</tr>
							  ))}
					</tbody>
				</Table>
			</TableContainer>
			{isLoading && data.length === 0 && (
				<Flex
					justify='center'
					p='sm'
				>
					<Loader />
				</Flex>
			)}
		</>
	)
}

export default CustomTable
