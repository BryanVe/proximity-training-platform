import styled from '@emotion/styled'
import { Button, createPolymorphicComponent, ButtonProps } from '@mantine/core'

type CustomButtonProps = ButtonProps & {
	hbg?: ButtonProps['bg']
	abg?: ButtonProps['bg']
}

const _CustomButton = styled(Button)<CustomButtonProps>`
	background-color: ${props => props.bg || props.theme.colors.gray[5]};

	&:hover {
		background-color: ${props => props.hbg || props.theme.colors.gray[4]};
	}

	&:active {
		background-color: ${props => props.abg || props.theme.colors.gray[6]};
	}
`

export const CustomButton = createPolymorphicComponent<
	'button',
	CustomButtonProps
>(_CustomButton)
