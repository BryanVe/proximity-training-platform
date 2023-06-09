import { CustomChart } from '@/components'
import { px, useMantineTheme } from '@mantine/core'
import { FC } from 'react'
import { Bar } from 'react-chartjs-2'

type DashboardBarProps = BarProps

const DashboardBar: FC<DashboardBarProps> = props => {
	const { ...barProps } = props
	const theme = useMantineTheme()

	const options: BarProps['options'] = {
		maintainAspectRatio: false,
		scales: {
			y: {
				grid: {
					display: false,
				},
				ticks: {
					color: theme.colors.gray[8],
					font: {},
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					minRotation: 75,
					color: theme.colors.gray[8],
					font: {
						size: px(theme.fontSizes.sm),
					},
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			datalabels: {
				align: 'top',
				anchor: 'end',
				color: theme.colors.gray[7],
				font: {
					weight: 'bold',
					size: px(theme.fontSizes.xs),
				},
			},
		},
	}

	return (
		<CustomChart
			{...barProps}
			chart={Bar}
			mih={250}
			options={options}
		/>
	)
}

export default DashboardBar
