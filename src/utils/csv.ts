export const getCSVFromTrainingsTable = (
	columns: CustomTableColumns<TrainingDTO>,
	data: TrainingDTO[]
) => {
	const header = columns
		.map(c => c.label)
		.join('\t')
		.concat('\n')

	const rows = data
		.map(e =>
			columns
				.map(c => (c.toCSV ? c.toCSV(e) : e[c.id as keyof TrainingDTO]))
				.join('\t')
		)
		.join('\n')

	return header + rows
}

export const downloadCSV = (csv: string, fileName: string) => {
	const hiddenElement = document.createElement('a')
	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
	hiddenElement.target = '_blank'
	hiddenElement.download = `${fileName}.csv`
	hiddenElement.click()
}
