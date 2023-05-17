import { CustomDoughnut } from '@/components'
import { MantineColor, px, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { FC } from 'react'

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
					family: theme.fontFamily,
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
						family: theme.fontFamily,
					},
				},
				position: matches ? 'bottom' : 'right',
				align: 'center',
				labels: {
					usePointStyle: true,
					font: {
						size: px(theme.fontSizes.sm),
						family: theme.fontFamily,
					},
				},
			},
		},
	}

	return (
		<CustomDoughnut
			{...doughnutProps}
			maw={500}
			mih={400}
			options={options}
		/>
	)
}

export default DashboardDoughnut
