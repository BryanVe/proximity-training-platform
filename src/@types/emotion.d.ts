import '@emotion/react'
import type { MantineTheme } from '@mantine/core'

declare module '@emotion/react' {
	// eslint-disable-next-line
	export interface Theme extends MantineTheme {}
}
