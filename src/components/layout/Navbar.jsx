import { FaGithub } from 'react-icons/fa';
import '@styles/scss/components/layout/Navbar.scss';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='navbar__container'>
				<FaGithub className='navbar__logo' />
                <h1>Github Finder</h1>
			</div>
		</nav>
	);
};

export default Navbar;
