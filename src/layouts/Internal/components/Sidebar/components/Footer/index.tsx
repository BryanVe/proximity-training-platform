import { useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '@mantine/core'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Links from '../Links'
import { removeUserSession } from '@/utils'

const Content = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const menu = [
		{
			label: 'Cerrar sesión',
			icon: faRightFromBracket,
			onClick: () => {
				removeUserSession()
				navigate('/', {
					replace: true,
				})
			},
		},
	]

	return (
		<Navbar.Section py='sm'>
			{menu.map(item => (
				<Links
					{...item}
					key={item.label}
					currentTo={location.pathname}
				/>
			))}
		</Navbar.Section>
	)
}

export default Content
