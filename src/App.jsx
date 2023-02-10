import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from '@components/layout/Navbar';
import User from '@pages/User';
import Repos from '@pages/Repos';
import Followers from '@pages/Followers';
import Following from '@pages/Following';
import Footer from '@components/layout/Footer';
import NotFound from '@pages/NotFound';

function App() {
	return (
		<Router>
			<div className='main-content'>
				<Navbar />
				<main className='container'>
					<Routes>
						<Route path='/' exact element={<Home />} />
						<Route path='/user/:login' element={<User />} />
						<Route path='/user/:login/repos' element={<Repos />} />
						<Route path='/user/:login/followers' element={<Followers />} />
						<Route path='/user/:login/following' element={<Following />} />
						<Route path='/not-found' element={<NotFound />} />
						<Route path='/*' element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
