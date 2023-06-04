type CustomTableDefaultDataItem = {
	id: number
} & Record<string, string | number | string[]>
type CustomTableDefaultData = CustomTableDefaultDataItem[]

type CustomTableColumn<T> = {
	id: keyof T | string
	label: string
	render?: (data: T) => import('react').ReactNode
}
type CustomTableColumns<T> = CustomTableColumn<T>[]
