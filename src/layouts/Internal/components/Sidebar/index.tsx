import {
	createStyles,
	Divider,
	Drawer,
	Navbar,
	ScrollArea,
} from '@mantine/core'
import { FC } from 'react'
import { Content, Footer, Header } from './components'

const useStyles = createStyles(theme => ({
	drawer: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},
	drawerBody: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
	},
}))

type SidebarProps = {
	opened: boolean
	close: () => void
}

const Sidebar: FC<SidebarProps> = props => {
	const { opened, close } = props
	const { classes, theme } = useStyles()

	const content = (
		<>
			<Header />
			<Divider
				color={theme.colors.gray[1]}
				label='Módulos'
				labelPosition='center'
			/>
			<Content />
			<Divider
				color={theme.colors.gray[1]}
				label='Configuración'
				labelPosition='center'
			/>
			<Footer />
		</>
	)

	return (
		<>
			<Navbar
				hidden
				hiddenBreakpoint='sm'
			>
				{content}
			</Navbar>
			<Drawer
				opened={opened}
				onClose={close}
				withCloseButton={false}
				className={classes.drawer}
				classNames={{
					body: classes.drawerBody,
				}}
				scrollAreaComponent={ScrollArea.Autosize}
			>
				{content}
			</Drawer>
		</>
	)
}

export default Sidebar
