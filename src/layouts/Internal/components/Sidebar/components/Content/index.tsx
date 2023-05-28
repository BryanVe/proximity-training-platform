import { useLocation } from 'react-router-dom'
import { Navbar } from '@mantine/core'
import {
	faBoxesStacked,
	faChartSimple,
} from '@fortawesome/free-solid-svg-icons'
import Links from '../Links'

const menu = [
	{
		label: 'Dashboard',
		icon: faChartSimple,
		to: '/dashboard',
	},
	{
		label: 'Entrenamientos',
		icon: faBoxesStacked,
		to: '/training',
	},
]

const Content = () => {
	const location = useLocation()

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
