import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import './index.css';
import AppRouter from './Router.jsx';

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<ThemeProvider>
				<AppRouter />
			</ThemeProvider>
		</StrictMode>
	);
} else {
	throw new Error('Root element not found');
}
