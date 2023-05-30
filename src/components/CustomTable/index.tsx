import { Table, TableProps } from '@mantine/core'
import { TableContainer } from './styled.components'

type CustomTableProps<T> = {
	data: T
	columns: CustomTableColumns<T>
	miw?: TableProps['miw']
	paginationEnabled?: boolean
	bordered?: boolean
	tdBorderTop?: boolean
}

function CustomTable<T extends CustomTableDefaultData>(
	props: CustomTableProps<T>
) {
	const { columns, data, miw, tdBorderTop = false } = props

	return (
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
					{data.map(item => (
						<tr key={item.id}>
							{columns.map(column => (
								<td
									key={column.id.toString()}
									style={{
										...(!tdBorderTop && {
											borderTop: 'none',
										}),
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
	)
}

export default CustomTable
