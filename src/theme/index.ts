import { MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
	fontFamily: 'Titillium Web',
	defaultGradient: {
		from: 'rgb(235, 28, 133)',
		to: 'rgb(248, 158, 74)',
		deg: 135,
	},
	colors: {
		pink: [
			'#FBEBFF',
			'#F0A7F2',
			'#EE85DC',
			'#EC61B8',
			'#EB3D88',
			'#D62E7D',
			'#BF2271',
			'#A31765',
			'#850E57',
			'#660847',
		],
	},
	primaryColor: 'red',
	components: {
		Navbar: {
			styles: theme => ({
				root: {
					padding: `0 ${theme.spacing.md}`,
					borderRight: 'none',
					boxShadow: '1px 0px 16px -8px rgba(68,68,68,0.59)',
				},
			}),
		},
	},
}

export default theme
