import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '@components/layout/Spinner';
import Error from '@components/layout/Error';
import RepoItem from './RepoItem';
import '@styles/scss/components/repos/ReposList.scss';

const ReposList = () => {
	const [order, setOrder] = useState('desc');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const params = useParams();
	const navigate = useNavigate();

	const {
		user,
		repos,
		dispatch,
		loading,
		getRepos,
		sortReposByStars,
		getUser,
	} = useGithubContext();

	useEffect(() => {
		const getUserData = async () => {
			dispatch({ type: 'SET_LOADING' });
			try {
				await getUser(params.login);
				await getRepos(params.login);
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

	sortReposByStars(repos, order);

	const handleSort = () => {
		setOrder(order === 'desc' ? 'asc' : 'desc');
	};

	if (error) return <Error msg={errorMessage} />;

	if (loading) return <Spinner />;

	return (
		<div className='repos-list'>
			<div className='user-repos-page-back'>
				<Link
					to={`/user/${user?.login}`}
					onClick={() =>
						dispatch({ type: 'CLEAR_USERS' }, { type: 'CLEAR_USER' })
					}
				>
					<FaChevronLeft /> Back to Profile
				</Link>
			</div>

			{!repos.length ? (
				<Spinner />
			) : (
				<>
					<div className='repos-list-heading'>
						<h2>
							{`${user ? user.name : 'loading...'}'s Public Repos`} (
							{user?.public_repos})
						</h2>
						<button onClick={handleSort}>
							Sort by Stars {order === 'desc' ? '↓' : '↑'}
						</button>
					</div>
					<div className='repos-list-grid'>
						{repos?.map(repo => (
							<RepoItem key={repo.id} repo={repo} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default ReposList;
