import styled from '@emotion/styled'
import {
	createPolymorphicComponent,
	rem,
	UnstyledButton,
	UnstyledButtonProps,
} from '@mantine/core'

type CustomButtonProps = UnstyledButtonProps & {
	hbg?: UnstyledButtonProps['bg']
	abg?: UnstyledButtonProps['bg']
}

const _CustomButton = styled(UnstyledButton)<CustomButtonProps>`
	padding: ${rem(16)} ${rem(32)};
	text-align: center;
	font-weight: 600;
	border-radius: ${({ theme }) => theme.radius.md};
	background-color: ${props => props.bg || props.theme.colors.gray[5]};

	&:hover {
		background-color: ${props => props.hbg || props.theme.colors.gray[4]};
	}

	&:active {
		background-color: ${props => props.abg || props.theme.colors.gray[6]};
		transform: translateY(${rem(1)});
	}
`

export const CustomButton = createPolymorphicComponent<
	'button',
	CustomButtonProps
>(_CustomButton)
