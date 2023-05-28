import { FC } from 'react'
import { ActionIcon, Burger, MediaQuery, rem, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Wrapper } from './styled.components'

type TopbarProps = {
	height: number
	opened: boolean
	open: () => void
}

const Topbar: FC<TopbarProps> = props => {
	const { height, open, opened } = props
	const navigate = useNavigate()

	return (
		<MediaQuery
			largerThan='sm'
			styles={{ display: 'none' }}
		>
			<Wrapper
				h={rem(height)}
				justify='space-between'
				align='center'
			>
				<Burger
					size='sm'
					opened={opened}
					onClick={open}
				/>
				<Title size='h3'>Proximity</Title>
				<ActionIcon
					color='gray.7'
					size='lg'
					radius='md'
					variant='outline'
					onClick={() =>
						navigate('/', {
							replace: true,
						})
					}
				>
					<FontAwesomeIcon icon={faRightFromBracket} />
				</ActionIcon>
			</Wrapper>
		</MediaQuery>
	)
}

export default Topbar
