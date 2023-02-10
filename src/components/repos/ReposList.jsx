import { Link, useParams } from 'react-router-dom';
import { useGithubContext } from '@hooks/useGithubContext';
import { useEffect } from 'react';
import { getUserAndRepos } from '@context/github/githubActions';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '@components/layout/Spinner';
import RepoItem from './RepoItem';
import '@styles/scss/components/repos/ReposList.scss';

const ReposList = () => {
	const params = useParams();

	const { user, repos, dispatch, loading } = useGithubContext();

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
			<h2>
				{`${user?.name}'s Public Repos`} ({user?.public_repos})
			</h2>
			<div className='repos-list-grid'>
				{repos?.map(repo => (
					<RepoItem key={repo.id} repo={repo} />
				))}
			</div>
		</div>
	);
};

export default ReposList;
