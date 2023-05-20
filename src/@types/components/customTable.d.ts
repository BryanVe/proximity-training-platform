type CustomTableDefaultDataItem = Record<string, number | string> & {
	id: string
}
type CustomTableDefaultData = CustomTableDefaultDataItem[]

type CustomTableColumn<T extends CustomTableDefaultData> = {
	id: keyof T[0]
	label: string
	render?: (data: T[0]) => JSX.Element
}
type CustomTableColumns<T> = CustomTableColumn<T>[]
