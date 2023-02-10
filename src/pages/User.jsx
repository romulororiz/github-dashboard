import { useGithubContext } from '@hooks/useGithubContext';
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getUserAndRepos } from '@context/github/githubActions';
import Spinner from '@components/layout/Spinner';
import { FaUsers } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { ImCodepen } from 'react-icons/im';
import { BsShopWindow } from 'react-icons/bs';
import '@styles/scss/pages/User.scss';

const User = () => {
	const { user, loading, dispatch } = useGithubContext();

	const params = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch({ type: 'SET_LOADING' });
		const getUserData = async () => {
			const userData = await getUserAndRepos(params.login);
			dispatch({
				type: 'GET_USER_AND_REPOS',
				payload: userData,
			});
		};
		getUserData();
	}, [params.login]);

	const {
		name,
		avatar_url,
		location,
		bio,
		blog,
		twitter_username,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
	} = user;

	if (loading) return <Spinner />;

	return (
		<div className='user-profile-page'>
			<div className='user-profile-page-back'>
				<Link
					to='/'
					onClick={() =>
						dispatch({ type: 'CLEAR_USERS' }, { type: 'CLEAR_USER' })
					}
				>
					Back to Search
				</Link>
			</div>
			<div className='user-profile-page-container'>
				<div className='user-profile-page-image'>
					<figure>
						<img src={avatar_url} alt='avatar' />
						<div className='user-profile-page-image__info'>
							<h2>{name}</h2>
							<p>{login}</p>
						</div>
					</figure>
				</div>
				<div className='user-profile-page-info'>
					<div className='user-profile-page-title'>
						<h1>{name}</h1>
					</div>
					<div className='user-profile-page-bio'>
						<p>{bio ? bio : ' Lorem ipsum dolor sit amet'}</p>
					</div>
					<div className='user-profile-page-action'>
						<button type='button'>
							<a href={html_url} target='_blank' rel='noreferrer'>
								Visit Github Profile
							</a>
						</button>
					</div>
					{!location && !blog && !twitter_username ? null : (
						<div className='user-profile-page-info-details'>
							{location && (
								<div className='user-profile-page-info-details-item'>
									<span>Location</span>
									<p>{location}</p>
								</div>
							)}
							{blog && (
								<div className='user-profile-page-info-details-item'>
									<span>Website</span>
									<a href={`https://${blog}`} target='_blank' rel='noreferrer'>
										{blog}
									</a>
								</div>
							)}
							{twitter_username && (
								<div className='user-profile-page-info-details-item'>
									<span>Twitter</span>
									<a href={`https://twitter.com/${twitter_username}`}>
										{twitter_username}
									</a>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			<div className='user-profile-page-stats'>
				<div className='user-profile-page-stats-item'>
					<FaUsers />
					<>
						<span>Followers</span>
						<p>{followers}</p>
					</>
				</div>
				<div className='user-profile-page-stats-item'>
					<HiUsers />
					<>
						<span>Following</span>
						<p>{following}</p>
					</>
				</div>
				<div
					className='user-profile-page-stats-item'
					onClick={() => navigate(`/user/${params.login}/repos`)}
				>
					<ImCodepen />
					<>
						<span>Public Repos</span>
						<p>{public_repos}</p>
					</>
				</div>
				<div className='user-profile-page-stats-item'>
					<BsShopWindow />
					<>
						<span>Public Gists</span>
						<p>{public_gists}</p>
					</>
				</div>
			</div>
		</div>
	);
};

export default User;
