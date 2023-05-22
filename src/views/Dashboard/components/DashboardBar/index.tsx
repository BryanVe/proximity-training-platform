import { CustomChart } from '@/components'
import { MantineColor, px, useMantineTheme } from '@mantine/core'
import { FC } from 'react'
import { Bar } from 'react-chartjs-2'

type DashboardBarProps = {
	dataLabelColor?: MantineColor
} & BarProps

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
					font: {
						weight: 'bold',
					},
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: theme.colors.gray[8],
					font: {
						weight: 'bold',
					},
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			datalabels: {
				align: 'bottom',
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
