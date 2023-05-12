import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, createStyles, Flex, rem, UnstyledButton } from '@mantine/core'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const useStyles = createStyles(theme => ({
	control: {
		display: 'block',
		width: '100%',
		fontWeight: 600,
		color: theme.colors.gray[5],
		fontSize: theme.fontSizes.sm,
		borderRadius: theme.radius.sm,
		padding: theme.spacing.sm,

		'&:hover': {
			backgroundColor: theme.colors.orange[0],
		},

		'&:active': {
			color: theme.white,
			fontWeight: 600,
			background: theme.fn.gradient({
				from: 'rgb(235, 28, 133)',
				to: 'rgb(248, 158, 74)',
				deg: 135,
			}),
		},
	},

	link: {
		display: 'block',
		textDecoration: 'none',
		width: '100%',
		fontWeight: 600,
		color: theme.colors.gray[5],
		fontSize: theme.fontSizes.sm,
		borderRadius: theme.radius.sm,
		padding: theme.spacing.sm,
		lineHeight: rem(1.55),

		'&:hover': {
			backgroundColor: theme.colors.orange[0],
		},
	},

	active: {
		color: theme.white,
		fontWeight: 600,
		background: theme.fn.gradient({
			from: 'rgb(235, 28, 133)',
			to: 'rgb(248, 158, 74)',
			deg: 135,
		}),
	},
}))

type LinksProps = {
	icon: IconDefinition
	label: string
	to?: string
	currentTo: string
	onClick?: () => void
}

const Links: FC<LinksProps> = props => {
	const { icon, label, to, currentTo, onClick } = props
	const { classes, cx } = useStyles()

	return (
		<>
			{to ? (
				<UnstyledButton
					component={Link}
					to={to}
					className={cx(classes.link, {
						[classes.active]: to === currentTo,
					})}
				>
					<Flex align='center'>
						<FontAwesomeIcon
							icon={icon}
							size='lg'
						/>
						<Box ml='md'>{label}</Box>
					</Flex>
				</UnstyledButton>
			) : (
				<UnstyledButton
					onClick={onClick}
					className={cx(classes.control, {
						[classes.active]: to === currentTo,
					})}
				>
					<Flex align='center'>
						<FontAwesomeIcon
							icon={icon}
							size='lg'
						/>
						<Box ml='md'>{label}</Box>
					</Flex>
				</UnstyledButton>
			)}
		</>
	)
}

export default Links
