import React from 'react';
import logo from './logo.svg';
import './App.css';

const Card = React.lazy(() =>
	// @ts-ignore
	import('design_system/Card').then(module => {
		return {
			default: module.Card,
		};
	})
);

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<React.Suspense fallback={null}>
					<Card />
				</React.Suspense>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
