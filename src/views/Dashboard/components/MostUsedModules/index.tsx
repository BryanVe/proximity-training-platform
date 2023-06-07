import { FeedbackMessage } from '@/components'
import { constants } from '@/config'
import { getMostUsedModulesRequest } from '@/request'
import { getUserSession } from '@/utils'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Flex, Title, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import DashboardDoughnut from '../DashboardDoughnut'

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
			<Title size='h3'>Módulos Más Utilizados</Title>
			{areMostUsedModulesLoading ? (
				<FeedbackMessage
					isLoading
					message='Cargando los módulos más utilizados...'
				/>
			) : mostUsedModulesError ? (
				<FeedbackMessage error={mostUsedModulesError} />
			) : Object.keys(mostUsedModules || {}).length > 0 ? (
				<DashboardDoughnut
					data={mostUsedModulesData}
					cutout='60%'
					dataLabelColor={theme.white}
				/>
			) : (
				<FeedbackMessage
					icon={faCircleInfo}
					message='No se encontró ningún módulo'
				/>
			)}
		</Flex>
	)
}

export default MostUsedModules
