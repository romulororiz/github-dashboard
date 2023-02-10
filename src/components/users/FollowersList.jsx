import UserItem from './UserItem';
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import Spinner from '@components/layout/Spinner';
import '@styles/scss/components/users/FollowersList.scss';
import { FaChevronLeft } from 'react-icons/fa';

const FollowersList = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { user, dispatch, loading, followers, getUser, getUserFollowers } =
		useGithubContext();

	useEffect(() => {
		const getUserData = async () => {
			dispatch({ type: 'SET_LOADING' });
			try {
				await getUser(params.login);
				await getUserFollowers(params.login);
			} catch (error) {
				navigate('/not-found');
			}
		};

		getUserData();
	}, [params.login]);

	if (loading) return <Spinner />;

	return (
		<div className='followers-list'>
			<div className='user-followers-page-back'>
				<Link
					to={`/user/${user?.login}`}
					onClick={() => {
						dispatch({ type: 'CLEAR_USER' });
						dispatch({ type: 'CLEAR_FOLLOWERS' });
					}}
				>
					<FaChevronLeft /> Back to Profile
				</Link>
			</div>
			<h2>
				{`${user?.name}'s Followers`} ({user.followers})
			</h2>
			<div className='followers-list-grid'>
				{followers?.map(follower => (
					<UserItem key={follower.id} user={follower} />
				))}
			</div>
		</div>
	);
};

export default FollowersList;
