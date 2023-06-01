import { Flex, Loader, Table, TableProps, Text } from '@mantine/core'
import { TableContainer } from './styled.components'

type CustomTableProps<T> = {
	data?: T
	columns: CustomTableColumns<T>
	miw?: TableProps['miw']
	isLoading?: boolean
}

function CustomTable<T extends CustomTableDefaultData>(
	props: CustomTableProps<T>
) {
	const { columns, data, miw, isLoading = false } = props

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
						{!isLoading &&
							data &&
							data.map(item => (
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
			<Flex
				justify='center'
				p='md'
			>
				{isLoading && <Loader />}
				{data && data.length === 0 && (
					<Text size='sm'>No se encontró resultados</Text>
				)}
			</Flex>
		</>
	)
}

export default CustomTable
