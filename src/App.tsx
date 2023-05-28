import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Notifications } from '@mantine/notifications'
import { DashboardView, LoginView, TrainingsView } from './views'
import { InternalLayout } from './layouts'
import theme from './theme'

const App = () => (
	<MantineProvider
		theme={theme}
		withGlobalStyles
		withNormalizeCSS
	>
		<Notifications
			position='bottom-center'
			zIndex={1000}
		/>
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={
						<Navigate
							to='/login'
							replace={true}
						/>
					}
				/>
				<Route
					path='/login'
					element={<LoginView />}
				/>
				<Route element={<InternalLayout />}>
					<Route
						path='/dashboard'
						element={<DashboardView />}
					/>
					<Route
						path='/training'
						element={<TrainingsView />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</MantineProvider>
)

export default App
