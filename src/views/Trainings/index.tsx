import { CustomTable } from '@/components'
import { Title } from '@mantine/core'

const columns: CustomTableColumns<TrainingData> = [
	{ id: 'date', label: 'Fecha' },
	{ id: 'name', label: 'Nombre' },
	{
		id: 'dni',
		label: 'DNI',
	},
	{
		id: 'module',
		label: 'Módulo',
	},
	{
		id: 'scenery',
		label: 'Escenario',
	},
	{
		id: 'observations',
		label: 'Observaciones',
	},
	{
		id: 'result',
		label: 'Resultado',
	},
	{
		id: 'time',
		label: 'Tiempo',
	},
]

const mockedData4: TrainingData = new Array(10).fill('').map((_, index) => ({
	id: `${index + 1}`,
	date: 'May 11, 2021, 10:41:52 AM',
	name: '<nombre_del_cliente>',
	dni: '999',
	module: 'Escalera Telescópica',
	scenery: 'Ladder Telescopic',
	observations: '',
	result: 'COMPLETADO CON ERRORES',
	time: '28',
}))

const Training = () => {
	return (
		<>
			<Title color='gray.8'>Entrenamientos</Title>
			<CustomTable<TrainingData>
				columns={columns}
				data={mockedData4}
				miw={1200}
			/>
		</>
	)
}

export default Training
