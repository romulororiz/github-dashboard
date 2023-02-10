import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '@components/layout/Spinner';
import UserItem from './UserItem';
import '@styles/scss/components/users/FollowingList.scss';

const FollowingList = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { user, dispatch, loading, following, getUserFollowing, getUser } =
		useGithubContext();

	useEffect(() => {
		const getUserData = async () => {
			dispatch({ type: 'SET_LOADING' });
			try {
				await getUser(params.login);
				await getUserFollowing(params.login);
			} catch (error) {
				navigate('/not-found');
			}
		};

		getUserData();
	}, [params.login]);

	if (loading) return <Spinner />;

	return (
		<div className='following-list'>
			<div className='user-following-page-back'>
				<Link
					to={`/user/${user?.login}`}
					onClick={() => {
						dispatch({ type: 'CLEAR_USER' });
						dispatch({ type: 'CLEAR_FOLLOWING' });
					}}
				>
					<FaChevronLeft /> Back to Profile
				</Link>
			</div>
			<h2>
				{`Followed by ${user?.name}`} ({user.following})
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
