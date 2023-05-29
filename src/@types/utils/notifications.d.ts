type StatusName = 'success' | 'error'
type BaseColorAndIcon = {
	baseColor: string
	icon: import('@fortawesome/free-solid-svg-icons').IconDefinition
}

type Statuses = Record<StatusName, BaseColorAndIcon>
type Notifications = Record<
	StatusName,
	(title: string, message: string) => void
>
