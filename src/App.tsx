import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DashboardView, AuthView, TrainingsView, ProfileView } from './views'
import { InternalLayout } from './layouts'
import theme from './theme'

const queryClient = new QueryClient()

const App = () => (
	<QueryClientProvider client={queryClient}>
		<MantineProvider
			theme={theme}
			withGlobalStyles
			withNormalizeCSS
		>
			<Notifications
				position='bottom-center'
				autoClose={1000}
				zIndex={5000}
			/>
			<BrowserRouter>
				<Routes>
					<Route
						index
						element={
							<Navigate
								to='/auth'
								replace
							/>
						}
					/>
					<Route
						path='/auth'
						element={<AuthView />}
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
						<Route
							path='/profile'
							element={<ProfileView />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	</QueryClientProvider>
)

export default App
