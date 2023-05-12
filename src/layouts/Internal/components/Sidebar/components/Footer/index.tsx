import { useLocation } from 'react-router-dom'
import { createStyles, Navbar } from '@mantine/core'
import Links from '../Links'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const menu = [
	{
		label: 'Cerrar sesión',
		icon: faRightFromBracket,
		onClick: () => {
			console.log('cerrar')
		},
	},
]

const useStyles = createStyles(theme => ({
	navbar: {
		backgroundColor: theme.white,
		paddingBottom: 0,
	},

	links: {},

	linksInner: {
		padding: `${theme.spacing.md} 0`,
	},
}))

const Content = () => {
	const { classes } = useStyles()
	const location = useLocation()

	return (
		<Navbar.Section className={classes.links}>
			<div className={classes.linksInner}>
				{menu.map(item => (
					<Links
						{...item}
						key={item.label}
						currentTo={location.pathname}
					/>
				))}
			</div>
		</Navbar.Section>
	)
}

export default Content
