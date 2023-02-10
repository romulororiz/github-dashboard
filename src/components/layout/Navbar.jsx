import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import '@styles/scss/components/layout/Navbar.scss';

const Navbar = () => {
	const navigate = useNavigate();

	const { dispatch } = useGithubContext();

	return (
		<nav className='navbar'>
			<div className='navbar__container'>
				<FaGithub className='navbar__logo' />
				<h2
					onClick={() => {
						dispatch({ type: 'CLEAR_USERS' });
						dispatch({ type: 'CLEAR_USER' });
						navigate('/');
					}}
				>
					Github Dashboard
				</h2>
			</div>
		</nav>
	);
};

export default Navbar;
