import dayjs from 'dayjs'

export const formatDate = (date?: string) =>
	date ? dayjs(date).format('MMM DD, YYYY,  hh:mm:ss A') : ''

export const getDifferenceFromDates = (
	startDate?: string,
	endDate?: string
) => {
	if (!startDate || !endDate) return ''

	const lastDate = dayjs(endDate)

	return lastDate.diff(startDate, 'minute').toString() + ' min'
}
