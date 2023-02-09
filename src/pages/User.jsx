import { useGithubContext } from '@hooks/useGithubContext';

const User = () => {
	const { user, loading, repos, dispatch } = useGithubContext();

	return (
		<div>
			<h1>User</h1>
		</div>
	);
};

export default User;
