import { CustomChart } from '@/components'
import { MantineColor, px, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'

type DashboardDoughnutProps = {
	title: string
	cutout?: string
	isPercentage?: boolean
	dataLabelColor?: MantineColor
} & DoughnutProps

const DashboardDoughnut: FC<DashboardDoughnutProps> = props => {
	const {
		title,
		cutout,
		isPercentage = false,
		dataLabelColor,
		...doughnutProps
	} = props
	const theme = useMantineTheme()
	const matches = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`)

	const options: DoughnutProps['options'] = {
		radius: '90%',
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
				title: {
					display: true,
					text: title,
					color: theme.colors.gray[5],
					font: {
						weight: 'bold',
						size: px(theme.fontSizes.md),
					},
				},
				position: matches ? 'bottom' : 'right',
				align: 'center',
				labels: {
					usePointStyle: true,
					color: theme.colors.gray[4],
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
			mih={400}
			options={options}
		/>
	)
}

export default DashboardDoughnut
