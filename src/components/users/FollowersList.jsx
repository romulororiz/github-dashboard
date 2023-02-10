import UserItem from './UserItem';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import Spinner from '@components/layout/Spinner';
import { getUser, getUserFollowers } from '@context/github/GithubActions';
import '@styles/scss/components/users/FollowersList.scss';
import { FaChevronLeft } from 'react-icons/fa';

const FollowersList = () => {
	const params = useParams();

	const { user, dispatch, loading, followers } = useGithubContext();

	useEffect(() => {
		dispatch({ type: 'SET_LOADING' });
		const getUserData = async () => {
			const followers = await getUserFollowers(params.login);
			const user = await getUser(params.login);
			dispatch({
				type: 'GET_USER',
				payload: user,
			});
			dispatch({
				type: 'GET_FOLLOWERS',
				payload: followers,
			});
		};
		getUserData();
	}, [params.login]);

	if (loading) return <Spinner />;

	return (
		<div className='followers-list'>
			<div className='user-followers-page-back'>
				<Link
					to={`/user/${user?.login}`}
					onClick={() =>
						dispatch({ type: 'CLEAR_USERS' }, { type: 'CLEAR_USER' })
					}
				>
					<FaChevronLeft /> Back to Profile
				</Link>
			</div>
			<h2>
				{`${user?.name}'s Followers`} - ({user.followers})
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
