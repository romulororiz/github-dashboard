import { Link } from 'react-router-dom';
import '@styles/scss/components/users/UserItem.scss';

const UserItem = ({ user }) => {
	return (
		<div className='user-item'>
			<img src={user.avatar_url} alt='avatar' />
			<div className='user-item__info'>
				<p>{user.login}</p>
				<Link to={`/user/${user.login}`}>Visit Profile</Link>
			</div>
		</div>
	);
};

export default UserItem;
