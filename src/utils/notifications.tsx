import {
	NotificationProps,
	notifications as mantineNotifications,
} from '@mantine/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { rem } from '@mantine/core'

const statuses: Statuses = {
	success: {
		baseColor: 'green',
		icon: faCheck,
	},
	error: {
		baseColor: 'red',
		icon: faXmark,
	},
}

const getNotificationProps = (
	status: StatusName,
	title: string,
	message: string
): NotificationProps => ({
	title,
	message,
	icon: <FontAwesomeIcon icon={statuses[status].icon} />,
	styles: theme => {
		const baseColor = theme.colors[statuses[status].baseColor]

		return {
			root: {
				backgroundColor: baseColor[0],
				border: `${rem(1)} solid ${baseColor[7]}`,
				boxShadow: 'none',
			},
			icon: {
				backgroundColor: baseColor[7],
			},
			title: {
				fontWeight: 600,
				color: baseColor[7],
				fontSize: theme.fontSizes.md,
			},
			description: {
				color: theme.colors.gray[8],
			},
		}
	},
})

export const notifications: Notifications = {
	success: (title, message) => {
		const notificationProps = getNotificationProps('success', title, message)
		mantineNotifications.show(notificationProps)
	},
	error: (title, message) => {
		const notificationProps = getNotificationProps('error', title, message)
		mantineNotifications.show(notificationProps)
	},
}
