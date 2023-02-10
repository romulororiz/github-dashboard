import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import { getUser, getUserFollowing } from '@context/github/GithubActions';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '@components/layout/Spinner';
import '@styles/scss/components/users/FollowingList.scss';
import UserItem from './UserItem';

const FollowingList = () => {
	const params = useParams();

	const { user, dispatch, loading, following } = useGithubContext();

	useEffect(() => {
		dispatch({ type: 'SET_LOADING' });
		const getUserData = async () => {
			const following = await getUserFollowing(params.login);
			const user = await getUser(params.login);
			dispatch({
				type: 'GET_USER',
				payload: user,
			});
			dispatch({
				type: 'GET_FOLLOWING',
				payload: following,
			});
		};
		getUserData();
	}, [params.login]);

	if (loading) return <Spinner />;

	return (
		<div className='following-list'>
			<div className='user-following-page-back'>
				<Link
					to={`/user/${user?.login}`}
					onClick={() => dispatch({ type: 'CLEAR_USER' })}
				>
					<FaChevronLeft /> Back to Profile
				</Link>
			</div>
			<h2>
				{`Following ${user?.name}`} - ({user.following})
			</h2>
			<div className='following-list-grid'>
				{following?.map(follow => (
					<UserItem key={follow.id} user={follow} />
				))}
			</div>
		</div>
	);
};

export default FollowingList;
