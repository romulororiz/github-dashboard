import { useGithubContext } from '@hooks/useGithubContext';
import { useAlertContext } from '@hooks/useAlertContext';
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaChevronLeft, FaAt, FaTwitter } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { ImCodepen } from 'react-icons/im';
import { MdLocationOn } from 'react-icons/md';
import Alert from '@components/layout/Alert';
import Spinner from '@components/layout/Spinner';
import '@styles/scss/pages/User.scss';

const User = () => {
	const { user, loading, dispatch, getUser } = useGithubContext();

	const { alert, setAlert } = useAlertContext();

	const params = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const getUserData = async () => {
			dispatch({ type: 'SET_LOADING' });
			try {
				await getUser(params.login);
			} catch (error) {
				navigate('/not-found');
			}
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
	} = user;

	if (loading) return <Spinner />;

	return (
		<div className='user-profile-page'>
			<div className='user-profile-page-back'>
				<Link
					to='/'
					onClick={() => {
						dispatch({ type: 'CLEAR_USERS' });
						dispatch({ type: 'CLEAR_USER' });
					}}
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
									<div className='details-item-heading'>
										<MdLocationOn />
										<span>Location</span>
									</div>
									<p>{location}</p>
								</div>
							)}
							{blog && (
								<div className='user-profile-page-info-details-item'>
									<div className='details-item-heading'>
										<FaAt />
										<span>Website</span>
									</div>
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
									<div className='details-item-heading'>
										<FaTwitter />
										<span>Twitter</span>
									</div>
									<a
										href={`https://twitter.com/${twitter_username}`}
										target='_blank'
										rel='noreferrer'
									>
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
					onClick={() => {
						navigate(`/user/${params.login}/followers`);
						dispatch({ type: 'SET_LOADING' });
					}}
				>
					<FaUsers />
					<>
						<span>Followers</span>
						<p>{followers}</p>
					</>
				</div>
				<div
					className='user-profile-page-stats-item'
					onClick={() => {
						navigate(`/user/${params.login}/following`);
						dispatch({ type: 'SET_LOADING' });
					}}
				>
					<HiUsers />
					<>
						<span>Following</span>
						<p>{following}</p>
					</>
				</div>
				<div
					className='user-profile-page-stats-item'
					onClick={() => {
						navigate(`/user/${params.login}/repos`);
						dispatch({ type: 'SET_LOADING' });
					}}
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
