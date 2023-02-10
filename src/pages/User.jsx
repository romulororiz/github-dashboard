import { useGithubContext } from '@hooks/useGithubContext';
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaChevronLeft } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { ImCodepen } from 'react-icons/im';
import Spinner from '@components/layout/Spinner';
import '@styles/scss/pages/User.scss';

const User = () => {
	const { user, loading, dispatch, getUserAndRepos } = useGithubContext();

	const params = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch({ type: 'SET_LOADING' });
		getUserAndRepos(params.login);
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
					<FaChevronLeft /> Back to Search
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
						<p>{bio}</p>
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
									<a
										href={
											blog.includes('https://') || blog.includes('http://')
												? blog
												: `https://${blog}`
										}
										target='_blank'
										rel='noreferrer'
									>
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
				<div
					className='user-profile-page-stats-item'
					onClick={() => navigate(`/user/${params.login}/followers`)}
				>
					<FaUsers />
					<>
						<span>Followers</span>
						<p>{followers}</p>
					</>
				</div>
				<div
					className='user-profile-page-stats-item'
					onClick={() => navigate(`/user/${params.login}/following`)}
				>
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
			</div>
		</div>
	);
};

export default User;
