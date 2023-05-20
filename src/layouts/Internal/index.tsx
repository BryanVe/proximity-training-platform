import { Box, Flex, MediaQuery, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { Sidebar, Topbar } from './components'
import { MainContainer } from './styled.components'

const navBarWidth = 280
const topBarHeight = 64

const Internal = () => {
	const [opened, { open, close }] = useDisclosure()

	return (
		<Flex>
			<Sidebar
				width={navBarWidth}
				opened={opened}
				close={close}
			/>
			<MainContainer>
				<Topbar
					height={topBarHeight}
					opened={opened}
					open={open}
				/>
				<MediaQuery
					smallerThan='sm'
					styles={{ marginTop: rem(topBarHeight), paddingBottom: rem(150) }}
				>
					<Box
						component='main'
						w='100%'
						maw={1500}
						mx='auto'
						p={rem(32)}
					>
						<Outlet />
					</Box>
				</MediaQuery>
			</MainContainer>
		</Flex>
	)
}

export default Internal
