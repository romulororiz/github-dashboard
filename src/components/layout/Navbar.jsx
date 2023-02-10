import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import '@styles/scss/components/layout/Navbar.scss';

const Navbar = () => {
	const { dispatch } = useGithubContext();

	return (
		<nav className='navbar'>
			<div className='navbar__container'>
				<FaGithub className='navbar__logo' />
				<Link
					to='/'
					onClick={() => {
						dispatch({ type: 'CLEAR_USERS' });
						dispatch({ type: 'CLEAR_USER' });
						dispatch({ type: 'CLEAR_FOLLOWERS' });
						dispatch({ type: 'CLEAR_FOLLOWING' });
					}}
				>
					Github Dashboard
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
