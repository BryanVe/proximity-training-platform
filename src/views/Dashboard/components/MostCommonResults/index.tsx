import { FeedbackMessage } from '@/components'
import { constants } from '@/config'
import { getMostCommonResultsRequest } from '@/request'
import { getUserSession } from '@/utils'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Flex, Title, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import DashboardDoughnut from '../DashboardDoughnut'

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
				backgroundColor: Object.values(theme.colors).map(color => color[5]),
			},
		],
	}

	return (
		<Flex
			direction='column'
			gap='md'
			h='100%'
		>
			<Title size='h3'>Resultados Más Comunes</Title>
			{areMostCommonResultsLoading ? (
				<FeedbackMessage
					isLoading
					message='Cargando los resultados más comunes...'
				/>
			) : mostCommonResultsError ? (
				<FeedbackMessage error={mostCommonResultsError} />
			) : Object.keys(mostCommonResults || {}).length > 0 ? (
				<DashboardDoughnut
					isPercentage
					data={mostCommonResultsData}
					cutout='40%'
					dataLabelColor={theme.white}
				/>
			) : (
				<FeedbackMessage
					icon={faCircleInfo}
					message='No se encontró ningún resultado'
				/>
			)}
		</Flex>
	)
}

export default MostCommonResults
