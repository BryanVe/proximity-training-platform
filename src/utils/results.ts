import { constants } from '@/config'
import { DefaultMantineColor } from '@mantine/core'

export const getColorForResult = (result?: string): DefaultMantineColor => {
	if (!result) return 'gray.6'

	result = result.toLocaleUpperCase()

	switch (result) {
		case constants.COMPLETED:
			return 'green.6'
		case constants.COMPLETED_WITH_ERRORS:
		case constants.COMPLETED_WITH_OBSERVATIONS:
			return 'yellow.6'
		case constants.NOT_COMPLETED:
		case constants.DISRUPTED:
			return 'red.6'
		case constants.INITIATED:
		case constants.START:
		default:
			return 'gray.6'
	}
}
