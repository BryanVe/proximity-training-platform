import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Notifications } from '@mantine/notifications'
import { DashboardView, LoginView, TrainingView } from './views'
import { InternalLayout } from './layouts'
import theme from './theme'

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
					element={<LoginView />}
				/>
				<Route element={<InternalLayout />}>
					<Route
						path='/dashboard'
						element={<DashboardView />}
					/>
					<Route
						path='/training'
						element={<TrainingView />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</MantineProvider>
)

export default App
