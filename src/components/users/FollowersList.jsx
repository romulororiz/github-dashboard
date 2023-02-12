import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import { useAlertContext } from '@hooks/useAlertContext';
import { FaChevronLeft } from 'react-icons/fa';
import UserItem from './UserItem';
import Spinner from '@components/layout/Spinner';
import Error from '@components/layout/Error';
import '@styles/scss/components/users/FollowersList.scss';

const FollowersList = () => {
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const params = useParams();

	const { user, dispatch, loading, followers, getUser, getUserFollowers } =
		useGithubContext();

	useEffect(() => {
		const getUserData = async () => {
			dispatch({ type: 'SET_LOADING' });
			try {
				await getUser(params.login);
				await getUserFollowers(params.login);
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
			{!followers.length ? (
				<Spinner />
			) : (
				<>
					<h2>
						{`${user?.name}'s Followers`} ({user.followers})
					</h2>
					<div className='followers-list-grid'>
						{followers?.map(follower => (
							<UserItem key={follower.id} user={follower} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default FollowersList;
