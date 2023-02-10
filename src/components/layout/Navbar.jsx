import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '@styles/scss/components/layout/Navbar.scss';

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<nav className='navbar'>
			<div className='navbar__container'>
				<FaGithub className='navbar__logo' />
				<h2 onClick={() => navigate('/')}>Github Finder</h2>
			</div>
		</nav>
	);
};

export default Navbar;
