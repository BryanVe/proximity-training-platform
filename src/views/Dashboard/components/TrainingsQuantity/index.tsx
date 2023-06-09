import { FeedbackMessage } from '@/components'
import { getAvailableModules } from '@/request'
import { getUserSession } from '@/utils'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Flex, Title, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import DashboardBar from '../DashboardBar'

const TrainingsQuantity = () => {
	const userSession = getUserSession()
	const theme = useMantineTheme()
	const {
		data: availableModules,
		isLoading: areAvailableModulesLoading,
		error: availableModulesError,
	} = useQuery<
		Record<string, number> | undefined,
		ErrorResponse,
		Record<string, number> | undefined,
		(string | undefined)[]
	>(
		['trainings', userSession?.organization],
		({ queryKey }) => {
			if (!queryKey[1]) return

			return getAvailableModules({
				organization: queryKey[1],
			})
		},
		{
			refetchOnWindowFocus: false,
		}
	)

	const availableModulesData: BarProps['data'] = {
		labels: availableModules ? Object.keys(availableModules) : [],
		datasets: [
			{
				data: availableModules ? Object.values(availableModules) : [],
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
			<Title size='h3'>Cantidad de Entrenamientos</Title>
			{areAvailableModulesLoading ? (
				<FeedbackMessage
					isLoading
					message='Cargando la cantidad de entrenamientos...'
				/>
			) : availableModulesError ? (
				<FeedbackMessage error={availableModulesError} />
			) : Object.keys(availableModules || {}).length > 0 ? (
				<DashboardBar
					data={availableModulesData}
					height={400}
				/>
			) : (
				<FeedbackMessage
					icon={faCircleInfo}
					message='No se encontró ningún entrenamiento'
				/>
			)}
		</Flex>
	)
}

export default TrainingsQuantity
