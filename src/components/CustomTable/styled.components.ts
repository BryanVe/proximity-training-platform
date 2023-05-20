import styled from '@emotion/styled'
import { Box, BoxProps } from '@mantine/core'

export const TableContainer = styled(Box)<BoxProps>`
	overflow: auto;
	margin: ${({ theme }) => theme.spacing.sm} 0;
`
