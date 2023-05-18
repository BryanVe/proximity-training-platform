import { Flex } from '@mantine/core'
import type { ChartType } from 'chart.js'
import type { TypedChartComponent } from 'react-chartjs-2/dist/types'

type CustomChartProps<T extends ChartType> = {
	mih: number
	maw?: number
	chart: TypedChartComponent<T>
} & ChartProps<T>

function CustomChart<T extends ChartType>(props: CustomChartProps<T>) {
	const { mih, maw, chart: Chart, ...chartProps } = props

	return (
		<Flex
			justify='center'
			align='center'
			mih={mih}
		>
			<Chart
				style={{
					maxWidth: maw,
				}}
				{...chartProps}
			/>
		</Flex>
	)
}

export default CustomChart
