import { Button, Flex } from '@mantine/core'
import { FC } from 'react'

type FooterProps = {
	strength: number
	save: () => void
	close: () => void
	loading: boolean
}

const Footer: FC<FooterProps> = props => {
	const { strength, save, close, loading } = props

	return (
		<Flex
			justify='flex-end'
			gap='md'
			mt='md'
		>
			<Button
				loading={loading}
				disabled={strength < 100}
				onClick={save}
			>
				Guardar
			</Button>
			<Button
				variant='outline'
				color='gray'
				onClick={close}
			>
				Cerrar
			</Button>
		</Flex>
	)
}

export default Footer
