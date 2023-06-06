type CustomTableDefaultDataItem = {
	id: number
} & Record<string, string | number | string[]>
type CustomTableDefaultData = CustomTableDefaultDataItem[]

type CustomTableColumn<T> = {
	id: string
	label: string
	toCSV?: (data: T) => string
	render?: (data: T) => import('react').ReactNode
}
type CustomTableColumns<T> = CustomTableColumn<T>[]
