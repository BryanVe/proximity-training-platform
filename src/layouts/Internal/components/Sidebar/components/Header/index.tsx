import { Image, Navbar, Text } from '@mantine/core'
import proximityLogo from '@/assets/images/proximity_logo.png'

const imageMaxWidth = 180

const Header = () => (
	<Navbar.Section
		mt='xs'
		mb='md'
	>
		<Image
			maw={imageMaxWidth}
			mx='auto'
			alt='Proximity Logo'
			src={proximityLogo}
		/>
		<Text ta='center'>Training Platform</Text>
	</Navbar.Section>
)

export default Header
