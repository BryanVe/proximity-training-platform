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
	font-weight: 600;
	background-color: ${({ theme }) => theme.colors.gray[4]};
	color: ${({ theme }) => theme.white};
	border-radius: ${({ theme }) => theme.radius.xl};

	&:active {
		background-color: ${({ theme }) => theme.colors.gray[5]};
		transform: translateY(${rem(1)});
	}
`

export const CustomButton = createPolymorphicComponent<
	'button',
	UnstyledButtonProps
>(_CustomButton)
