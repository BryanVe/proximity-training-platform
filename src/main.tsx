import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	LinearScale,
	BarElement,
	CategoryScale,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import theme from './theme'

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	ChartDataLabels,
	LinearScale,
	CategoryScale,
	BarElement
)

ChartJS.defaults.font.family = theme.fontFamily as string

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
