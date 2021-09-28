import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import AppLayout from './components/AppLayout';
import GermanoCard from './components/GermanoCard';

const App: React.FC = (props) => {
	const theme = createTheme()
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<AppLayout>
					<div style={{ display: 'flex', margin: '10px' }}>
						<GermanoCard/>
					</div>
				</AppLayout>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
