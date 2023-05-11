import styled from '@emotion/styled'
import {
	createPolymorphicComponent,
	rem,
	UnstyledButton,
	UnstyledButtonProps,
} from '@mantine/core'

const _CustomButton = styled(UnstyledButton)`
	place-self: end;
	padding: ${rem(20)} ${rem(40)};
	width: 100%;
	text-align: center;
	font-weight: 500;
	background-color: ${({ theme }) => theme.colors.gray[5]};
	color: ${({ theme }) => theme.white};
	border-radius: ${({ theme }) => theme.radius.xl};
`

export const CustomButton = createPolymorphicComponent<
	'button',
	UnstyledButtonProps
>(_CustomButton)
