import {
	Divider,
	Drawer,
	MediaQuery,
	Navbar,
	useMantineTheme,
} from '@mantine/core'
import { FC } from 'react'
import { Content, Footer, Header } from './components'

type SidebarProps = {
	width: number
	opened: boolean
	close: () => void
}

const Sidebar: FC<SidebarProps> = props => {
	const { opened, close, width } = props
	const theme = useMantineTheme()

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
				w={width}
			>
				{content}
			</Navbar>
			<MediaQuery
				largerThan='sm'
				styles={{ display: 'none' }}
			>
				<Drawer
					size={width}
					opened={opened}
					onClose={close}
					withCloseButton={false}
				>
					{content}
				</Drawer>
			</MediaQuery>
		</>
	)
}

export default Sidebar
