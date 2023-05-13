import styled from '@emotion/styled'
import { Flex } from '@mantine/core'

export const Wrapper = styled(Flex)`
	background-color: ${({ theme }) => theme.white};
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	padding: ${({ theme }) => theme.spacing.md};
	box-shadow: 0px 1px 16px -8px rgba(68, 68, 68, 0.59);
`
