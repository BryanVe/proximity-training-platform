import { constants } from '@/config'
import { Divider, Grid, List, Text, Title } from '@mantine/core'
import { FC } from 'react'

type ExtraInfoProps = {
	training: TrainingDTO
}

const ExtraInfo: FC<ExtraInfoProps> = props => {
	const { training } = props

	return (
		<>
			<Title
				color='gray.8'
				size='h2'
				mt='md'
			>
				Entrenamiento {training.id}
			</Title>
			<Divider my='md' />
			<Grid gutter='xl'>
				<Grid.Col md={6}>
					<Title
						color='gray.8'
						size='h3'
						mb='xs'
					>
						{training.module === constants.SCOOP_MODULE
							? constants.SCOOP_MODULE_NAMES.criticalErrors
							: constants.REGULAR_MODULE_NAMES.criticalErrors}
					</Title>
					{training.criticalErrors.length > 0 ? (
						<List withPadding>
							{training.criticalErrors.map(e => (
								<List.Item>{e}</List.Item>
							))}
						</List>
					) : (
						<Text>No se encontró resultados</Text>
					)}
				</Grid.Col>
				<Grid.Col md={6}>
					<Title
						color='gray.8'
						size='h3'
						mb='xs'
					>
						{training.module === constants.SCOOP_MODULE
							? constants.SCOOP_MODULE_NAMES.eppIncorrectamenteTomados
							: constants.REGULAR_MODULE_NAMES.eppIncorrectamenteTomados}
					</Title>
					{training.eppIncorrectamenteTomados.length > 0 ? (
						<List withPadding>
							{training.eppIncorrectamenteTomados.map(e => (
								<List.Item>{e}</List.Item>
							))}
						</List>
					) : (
						<Text>No se encontró resultados</Text>
					)}
				</Grid.Col>
				<Grid.Col md={6}>
					<Title
						color='gray.8'
						size='h3'
						mb='xs'
					>
						{training.module === constants.SCOOP_MODULE
							? constants.SCOOP_MODULE_NAMES.minorErrors
							: constants.REGULAR_MODULE_NAMES.minorErrors}
					</Title>
					{training.minorErrors.length > 0 ? (
						<List withPadding>
							{training.minorErrors.map(e => (
								<List.Item>{e}</List.Item>
							))}
						</List>
					) : (
						<Text>No se encontró resultados</Text>
					)}
				</Grid.Col>
				<Grid.Col md={6}>
					<Title
						color='gray.8'
						size='h3'
						mb='xs'
					>
						{training.module === constants.SCOOP_MODULE
							? constants.SCOOP_MODULE_NAMES.eppNoTomados
							: constants.REGULAR_MODULE_NAMES.eppNoTomados}
					</Title>
					{training.eppNoTomados.length > 0 ? (
						<List withPadding>
							{training.eppNoTomados.map(e => (
								<List.Item>{e}</List.Item>
							))}
						</List>
					) : (
						<Text>No se encontró resultados</Text>
					)}
				</Grid.Col>
			</Grid>
		</>
	)
}

export default ExtraInfo
