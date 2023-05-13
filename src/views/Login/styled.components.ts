import styled from '@emotion/styled'
import { createPolymorphicComponent, Paper, PaperProps } from '@mantine/core'

export const Wrapper = styled.div`
	display: grid;
	position: absolute;
	inset: 0;
	background: ${({ theme }) => theme.fn.gradient(theme.defaultGradient)};
`

const _LoginContainer = styled(Paper)`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.lg};
	width: 90%;
	max-width: 350px;
	place-self: center;
	border-radius: ${({ theme }) => theme.radius.lg};
`

export const LoginContainer = createPolymorphicComponent<'div', PaperProps>(
	_LoginContainer
)
