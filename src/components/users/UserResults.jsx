import { useGithubContext } from '@hooks/useGithubContext';
import UserItem from '@components/users/UserItem';
import Spinner from '@components/layout/Spinner';
import '@styles/scss/components/users/UserResults.scss';

const UserResults = () => {
	const { users, loading } = useGithubContext();

	if (loading) return <Spinner />;

	return (
		<div className='user-results'>
			{users.map(user => (
				<UserItem key={user.id} user={user} />
			))}
		</div>
	);
};

export default UserResults;
