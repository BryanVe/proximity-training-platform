import { Table, TableProps, MantineColor } from '@mantine/core'
import { TableContainer } from './styled.components'

type CustomTableProps<T> = {
	data: T
	columns: CustomTableColumns<T>
	miw?: TableProps['miw']
	paginationEnabled?: boolean
	bordered?: boolean
	thBorderBottomColor?: MantineColor
	tdBorderTop?: boolean
	striped?: TableProps['striped']
	highlightOnHover?: TableProps['highlightOnHover']
}

function CustomTable<T extends CustomTableDefaultData>(
	props: CustomTableProps<T>
) {
	const {
		columns,
		data,
		miw,
		thBorderBottomColor,
		tdBorderTop = false,
		striped,
		highlightOnHover,
	} = props

	return (
		<TableContainer>
			<Table
				miw={miw}
				striped={striped}
				highlightOnHover={highlightOnHover}
			>
				<thead>
					<tr>
						{columns.map(column => (
							<th
								key={column.id.toString()}
								style={{
									borderBottomColor: thBorderBottomColor,
								}}
							>
								{column.label}
							</th>
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
