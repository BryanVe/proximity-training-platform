import { Flex, PasswordInput, Progress } from '@mantine/core'
import { FC } from 'react'
import Message from '../Message'

type PasswordInputsProps = {
	password: string
	secondPassword: string
	strength: number
	error?: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInputs: FC<PasswordInputsProps> = props => {
	const { password, secondPassword, strength, error, onChange } = props
	const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

	return (
		<Flex
			direction='column'
			mt='md'
			gap='xs'
		>
			<PasswordInput
				name='first'
				placeholder='Contraseña'
				value={password}
				onChange={onChange}
			/>
			<PasswordInput
				name='second'
				placeholder='Repite la contraseña'
				value={secondPassword}
				onChange={onChange}
			/>
			<Progress
				color={color}
				value={strength}
				radius='xs'
			/>
			<Message
				error={Boolean(error)}
				label={error ?? 'Contraseña segura'}
			/>
		</Flex>
	)
}

export default PasswordInputs
