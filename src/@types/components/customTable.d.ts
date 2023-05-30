type CustomTableDefaultDataItem = Record<string, number | string> & {
	id: number
}
type CustomTableDefaultData = CustomTableDefaultDataItem[]

type CustomTableColumn<
	T extends CustomTableDefaultData = CustomTableDefaultData
> = {
	id: keyof T[0] | string
	label: string
	render?: (data: T[0]) => JSX.Element
}
type CustomTableColumns<T> = CustomTableColumn<T>[]
