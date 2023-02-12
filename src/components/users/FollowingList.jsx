import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '@components/layout/Spinner';
import Error from '@components/layout/Error';
import UserItem from './UserItem';
import '@styles/scss/components/users/FollowingList.scss';

const FollowingList = () => {
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const params = useParams();

	const { user, dispatch, loading, following, getUserFollowing, getUser } =
		useGithubContext();

	useEffect(() => {
		const getUserData = async () => {
			dispatch({ type: 'SET_LOADING' });
			try {
				await getUser(params.login);
				await getUserFollowing(params.login);
			} catch (error) {
				setError(true);
				setErrorMessage(
					`Error: ${error.message} - ${error.response?.data.message}`
				);
			}
		};

		setError(false);
		getUserData();
	}, [params.login]);

	if (error) return <Error msg={errorMessage} />;

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
			{!following.length ? (
				<Spinner />
			) : (
				<>
					<h2>
						{`Followed by ${user?.name}`} ({user.following})
					</h2>
					<div className='following-list-grid'>
						{following?.map(follow => (
							<UserItem key={follow.id} user={follow} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default FollowingList;
