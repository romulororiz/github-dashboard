import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@styles/scss/index.scss';
import { GithubProvider } from '@context/github/GithubContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GithubProvider>
			<App />
		</GithubProvider>
	</React.StrictMode>
);
