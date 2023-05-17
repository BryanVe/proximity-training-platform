import { FC } from 'react'
import { Flex } from '@mantine/core'
import { Doughnut } from 'react-chartjs-2'

type CustomDoughnutProps = {
	mih: number
	maw: number
} & DoughnutProps

const CustomDoughnut: FC<CustomDoughnutProps> = props => {
	const { mih, maw, ...doughnutProps } = props

	return (
		<Flex
			justify='center'
			align='center'
			mih={mih}
		>
			<Doughnut
				style={{
					maxWidth: maw,
				}}
				{...doughnutProps}
			/>
		</Flex>
	)
}

export default CustomDoughnut
