import {
	faCircleInfo,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { Table, TableProps } from '@mantine/core'
import FeedbackMessage from '../FeedbackMessage'
import { TableContainer } from './styled.components'

type CustomTableProps<T> = {
	data?: T
	columns: CustomTableColumns<T>
	miw?: TableProps['miw']
	isLoading?: boolean
	error?: string
	loadingMessage?: string
}

function CustomTable<T extends CustomTableDefaultData>(
	props: CustomTableProps<T>
) {
	const {
		columns,
		data,
		miw,
		isLoading = false,
		error,
		loadingMessage = 'Cargando...',
	} = props

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
			{isLoading ? (
				<FeedbackMessage
					isLoading
					message={loadingMessage}
				/>
			) : error ? (
				<FeedbackMessage
					icon={faTriangleExclamation}
					message={`Ocurrió el siguiente error: ${error}`}
				/>
			) : data?.length === 0 ? (
				<FeedbackMessage
					icon={faCircleInfo}
					message='No se encontró ningún resultado'
				/>
			) : null}
		</>
	)
}

export default CustomTable
