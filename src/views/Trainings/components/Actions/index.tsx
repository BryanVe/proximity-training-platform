import { constants } from '@/config'
import { getTrainings } from '@/request'
import {
	downloadCSV,
	formatDate,
	getCSVFromTrainingsTable,
	getUserSession,
	notifications,
} from '@/utils'
import {
	faDownload,
	faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Menu } from '@mantine/core'
import { FC } from 'react'

type ActionsProps = {
	selectedModule: string
	total: number
	columns: CustomTableColumns<TrainingDTO>
}

const Actions: FC<ActionsProps> = props => {
	const { columns, selectedModule, total } = props
	const userSession = getUserSession()

	const exportCSV = async () => {
		try {
			if (!userSession) return

			const trainings = await getTrainings({
				organization: userSession.organization,
				module: selectedModule,
				limit: total,
				offset: 0,
			})

			const errorColumns: CustomTableColumns<TrainingDTO> = Object.entries(
				selectedModule === constants.SCOOP_MODULE
					? constants.SCOOP_MODULE_NAMES
					: constants.REGULAR_MODULE_NAMES
			).map(([key, value]) => ({
				id: key,
				label: value,
				toCSV: data => {
					const errors = data[key as keyof TrainingDTO] as string[]
					return errors.join(',')
				},
			}))

			const csvColumns = columns
				.filter(c => c.id !== 'actions')
				.concat(errorColumns)

			const csv = getCSVFromTrainingsTable(csvColumns, trainings)
			downloadCSV(
				csv,
				`${formatDate(new Date().toISOString())}-${selectedModule}`
			)
		} catch (error) {
			notifications.error('Ocurrió un error al exportar la tabla', '')
		}
	}

	return (
		<Menu
			shadow='md'
			position='bottom-end'
		>
			<Menu.Target>
				<ActionIcon
					color='red'
					size='md'
					variant='filled'
				>
					<FontAwesomeIcon icon={faEllipsisVertical} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					onClick={exportCSV}
					icon={<FontAwesomeIcon icon={faDownload} />}
				>
					Exportar CSV
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}

export default Actions
