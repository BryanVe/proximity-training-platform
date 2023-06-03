import { constants } from '@/config'
import { getMostCommonResultsRequest } from '@/request'
import { getUserSession } from '@/utils'
import {
	faCircleInfo,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { Flex, Title, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import DashboardDoughnut from '../DashboardDoughnut'
import FeedbackMessage from '../FeedbackMessage'

const MostCommonResults = () => {
	const userSession = getUserSession()
	const theme = useMantineTheme()
	const {
		data: mostCommonResults,
		isLoading: areMostCommonResultsLoading,
		error: mostCommonResultsError,
	} = useQuery<
		Record<string, string> | undefined,
		ErrorResponse,
		Record<string, string> | undefined,
		(string | undefined)[]
	>(
		['mostCommonResults', userSession?.organization],
		({ queryKey }) => {
			if (!queryKey[1]) return

			return getMostCommonResultsRequest({
				organization: queryKey[1],
				limit: constants.MAX_CHART_RESULTS,
			})
		},
		{
			refetchOnWindowFocus: false,
		}
	)

	const mostCommonResultsData: DoughnutProps['data'] = {
		labels: mostCommonResults ? Object.keys(mostCommonResults) : [],
		datasets: [
			{
				data: mostCommonResults ? Object.values(mostCommonResults) : [],
				backgroundColor: mostCommonResults
					? Object.keys(mostCommonResults).map((_, index) =>
							theme.fn.lighten(theme.colors.yellow[6], 0.1 * index)
					  )
					: [],
			},
		],
	}

	return areMostCommonResultsLoading ? (
		<FeedbackMessage
			isLoading
			message='Cargando los resultados más comunes...'
		/>
	) : mostCommonResultsError ? (
		<FeedbackMessage
			icon={faTriangleExclamation}
			message={`Ocurrió el siguiente error: ${mostCommonResultsError.response?.data.message}`}
		/>
	) : Object.keys(mostCommonResults || {}).length > 0 ? (
		<Flex
			direction='column'
			gap='md'
		>
			<Title
				color='gray.8'
				size='h3'
			>
				Resultados Más Comunes
			</Title>
			<DashboardDoughnut
				isPercentage
				data={mostCommonResultsData}
				cutout='40%'
				dataLabelColor={theme.colors.gray[8]}
			/>
		</Flex>
	) : (
		<FeedbackMessage
			icon={faCircleInfo}
			message='No se encontró ningún resultado'
		/>
	)
}

export default MostCommonResults
