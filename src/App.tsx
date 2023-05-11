import { MantineProvider } from '@mantine/core'
import theme from './theme'

const App = () => (
	<MantineProvider
		theme={theme}
		withGlobalStyles
		withNormalizeCSS
	>
		<div>Initialize app</div>
	</MantineProvider>
)

export default App
