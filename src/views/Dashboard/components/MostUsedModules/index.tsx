import { constants } from '@/config'
import { getMostUsedModulesRequest } from '@/request'
import { getUserSession } from '@/utils'
import {
	faCircleInfo,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { Flex, Title, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import DashboardDoughnut from '../DashboardDoughnut'
import FeedbackMessage from '../FeedbackMessage'

const MostUsedModules = () => {
	const userSession = getUserSession()
	const theme = useMantineTheme()
	const {
		data: mostUsedModules,
		isLoading: areMostUsedModulesLoading,
		error: mostUsedModulesError,
	} = useQuery<
		Record<string, number> | undefined,
		ErrorResponse,
		Record<string, number> | undefined,
		(string | undefined)[]
	>(
		['mostUsedModules', userSession?.organization],
		({ queryKey }) => {
			if (!queryKey[1]) return

			return getMostUsedModulesRequest({
				organization: queryKey[1],
				limit: constants.MAX_CHART_RESULTS,
			})
		},
		{
			refetchOnWindowFocus: false,
		}
	)

	const mostUsedModulesData: DoughnutProps['data'] = {
		labels: mostUsedModules ? Object.keys(mostUsedModules) : [],
		datasets: [
			{
				data: mostUsedModules ? Object.values(mostUsedModules) : [],
				backgroundColor: mostUsedModules
					? Object.keys(mostUsedModules).map((_, index) =>
							theme.fn.lighten(theme.colors.pink[5], 0.1 * index)
					  )
					: [],
			},
		],
	}

	return areMostUsedModulesLoading ? (
		<FeedbackMessage
			isLoading
			message='Cargando los módulos más utilizados...'
		/>
	) : mostUsedModulesError ? (
		<FeedbackMessage
			icon={faTriangleExclamation}
			message={`Ocurrió el siguiente error: ${mostUsedModulesError.response?.data.message}`}
		/>
	) : Object.keys(mostUsedModules || {}).length > 0 ? (
		<Flex
			direction='column'
			gap='md'
		>
			<Title
				color='gray.8'
				size='h3'
			>
				Módulos Más Utilizados
			</Title>
			<DashboardDoughnut
				data={mostUsedModulesData}
				cutout='60%'
				dataLabelColor={theme.white}
			/>
		</Flex>
	) : (
		<FeedbackMessage
			icon={faCircleInfo}
			message='No se encontró ningún módulo'
		/>
	)
}

export default MostUsedModules
