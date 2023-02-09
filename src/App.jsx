import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/layout/Navbar';

function App() {
	return (
		<Router>
			<div className='main-content'>
				<Navbar />
				<main className='container'>
					<Routes>
						<Route path='/' exact element={<Home />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
