import { Button, Flex } from '@mantine/core'
import React, { FC } from 'react'

type FooterProps = {
	strength: number
	save: () => void
	close: () => void
}

const Footer: FC<FooterProps> = props => {
	const { strength, save, close } = props

	return (
		<Flex
			justify='flex-end'
			gap='md'
			mt='md'
		>
			<Button
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
