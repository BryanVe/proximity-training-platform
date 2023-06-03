import { CustomChart } from '@/components'
import { MantineColor, px, useMantineTheme } from '@mantine/core'
import { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'

type DashboardDoughnutProps = {
	cutout?: string
	isPercentage?: boolean
	dataLabelColor?: MantineColor
} & DoughnutProps

const DashboardDoughnut: FC<DashboardDoughnutProps> = props => {
	const {
		cutout,
		isPercentage = false,
		dataLabelColor,
		...doughnutProps
	} = props
	const theme = useMantineTheme()

	const options: DoughnutProps['options'] = {
		cutout,
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				...(isPercentage && {
					formatter: value => `${value}%`,
				}),
				color: dataLabelColor,
				font: {
					weight: 'bold',
					size: px(theme.fontSizes.xs),
				},
			},
			tooltip: {
				callbacks: {
					label: value => {
						let { formattedValue } = value

						if (isPercentage) formattedValue = formattedValue.concat('%')

						return ` ${formattedValue}`
					},
				},
			},
			legend: {
				position: 'bottom',
				title: {
					display: true,
				},
				labels: {
					usePointStyle: true,
					color: theme.colors.gray[7],
					font: {
						size: px(theme.fontSizes.sm),
					},
				},
			},
		},
	}

	return (
		<CustomChart
			{...doughnutProps}
			chart={Doughnut}
			maw={500}
			mih={300}
			options={options}
		/>
	)
}

export default DashboardDoughnut
