import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import theme from './theme'
import { LoginView } from './views'
import { Notifications } from '@mantine/notifications'

const App = () => (
	<MantineProvider
		theme={theme}
		withGlobalStyles
		withNormalizeCSS
	>
		<Notifications position='top-right' />
		<BrowserRouter>
			<Routes>
				<Route
					index
					path='/'
					Component={LoginView}
				/>
			</Routes>
		</BrowserRouter>
	</MantineProvider>
)

export default App
