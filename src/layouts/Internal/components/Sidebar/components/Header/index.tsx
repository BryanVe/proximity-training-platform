import { createStyles, Image, Navbar, Text } from '@mantine/core'
import proximityLogo from '@/assets/images/proximity_logo.png'

const useStyles = createStyles(theme => ({
	header: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing.xs,
		paddingBottom: theme.spacing.md,
	},

	title: {
		fontSize: theme.fontSizes.xl,
		color: theme.colors.blue[6],
		fontWeight: 800,
	},
}))

const Header = () => {
	const { classes } = useStyles()

	return (
		<Navbar.Section className={classes.header}>
			<Image
				maw={180}
				mx='auto'
				alt='Proximity Logo'
				src={proximityLogo}
			/>
			<Text ta='center'>Training Platform</Text>
		</Navbar.Section>
	)
}

export default Header
