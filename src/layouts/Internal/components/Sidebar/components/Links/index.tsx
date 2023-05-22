import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, createStyles, Flex, rem, UnstyledButton } from '@mantine/core'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const useStyles = createStyles(theme => ({
	button: {
		display: 'block',
		width: '100%',
		fontWeight: 500,
		color: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		borderRadius: theme.radius.sm,
		padding: theme.spacing.sm,

		'&:hover': {
			backgroundColor: theme.colors.orange[0],
		},

		'&:active': {
			color: theme.white,
			fontWeight: 600,
			background: theme.fn.gradient(theme.defaultGradient),
		},
	},

	link: {
		textDecoration: 'none',
		lineHeight: rem(1.55),
	},

	active: {
		color: theme.white,
		fontWeight: 600,
		background: theme.fn.gradient(theme.defaultGradient),
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

	const content = (
		<Flex align='center'>
			<FontAwesomeIcon
				icon={icon}
				size='lg'
			/>
			<Box ml='md'>{label}</Box>
		</Flex>
	)

	return to ? (
		<UnstyledButton
			to={to}
			component={Link}
			className={cx(classes.button, classes.link, {
				[classes.active]: to === currentTo,
			})}
		>
			{content}
		</UnstyledButton>
	) : (
		<UnstyledButton
			onClick={onClick}
			className={cx(classes.button, {
				[classes.active]: to === currentTo,
			})}
		>
			{content}
		</UnstyledButton>
	)
}

export default Links
