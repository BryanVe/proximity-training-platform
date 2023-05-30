import { Divider, Drawer, MediaQuery, Navbar } from '@mantine/core'
import { FC } from 'react'
import { Content, Footer, Header } from './components'

type SidebarProps = {
	width: number
	opened: boolean
	close: () => void
}

const Sidebar: FC<SidebarProps> = props => {
	const { opened, close, width } = props

	const content = (
		<>
			<Header />
			<Divider
				color='gray.5'
				label='Módulos'
				labelPosition='center'
			/>
			<Content />
			<Divider
				color='gray.5'
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
				miw={width}
			>
				{content}
			</Navbar>
			<MediaQuery
				largerThan='sm'
				styles={{ display: 'none' }}
			>
				<Drawer
					zIndex={3000}
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
