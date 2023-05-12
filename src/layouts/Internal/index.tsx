import {
	ActionIcon,
	Box,
	Burger,
	createStyles,
	Flex,
	Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const useStyles = createStyles(theme => ({
	container: {
		flexGrow: 1,
		overflowX: 'auto',
	},
	topBar: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		height: 64,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: theme.spacing.md,
		boxSizing: 'border-box',
		boxShadow: '0px 1px 16px -8px rgba(68,68,68,0.59)',

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},
	main: {
		[theme.fn.smallerThan('sm')]: {
			paddingTop: 64 + 16,
		},
	},
	burgerContainer: {
		position: 'absolute',
		right: theme.spacing.md,
		bottom: theme.spacing.md,
		backgroundColor: theme.colors.blue[6],
		borderRadius: theme.radius.xl,
		padding: theme.spacing.xs,
	},
}))

const Internal = () => {
	const { classes } = useStyles()
	const [opened, { open, close }] = useDisclosure()

	return (
		<Flex>
			<Sidebar
				opened={opened}
				close={close}
			/>
			<Box className={classes.container}>
				<div className={classes.topBar}>
					<Burger
						size='sm'
						opened={opened}
						onClick={open}
					/>
					<Title size='h3'>Proximity</Title>
					<ActionIcon
						color='gray.3'
						size='lg'
						radius='md'
						variant='outline'
					>
						<FontAwesomeIcon icon={faRightFromBracket} />
					</ActionIcon>
				</div>
				<main className={classes.main}>
					<Outlet />
				</main>
			</Box>
			{/* <div className={classes.container}>
				<Outlet />
				<Tooltip
					label='Abrir menú'
					position='left'
					withArrow
				>
					<Box className={classes.burgerContainer}>
						<Burger
							opened={opened}
							onClick={open}
							color='white'
						/>
					</Box>
				</Tooltip>
			</div> */}
		</Flex>
	)
}

export default Internal
