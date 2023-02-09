import { useState } from 'react';
import { searchUsers } from '@context/github/githubActions';
import { useGithubContext } from '@hooks/useGithubContext';
import { useAlertContext } from '@hooks/useAlertContext';
import Alert from '../layout/Alert';
import '@styles/scss/components/users/UserSearch.scss';

const UserSearch = () => {
	const [query, setQuery] = useState('');

	const { users, dispatch } = useGithubContext();

	const { setAlert, alert } = useAlertContext();

	const handleChange = e => setQuery(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();

		if (query === '') {
			setAlert('You forgot something there!', 'error');
		} else {
			dispatch({ type: 'SET_LOADING' });
			try {
				const users = await searchUsers(query);
				dispatch({ type: 'GET_USERS', payload: users });
				setQuery('');
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className='user-search'>
			<span>Search for a User</span>
			<div className='user-search__container'>
				<form onSubmit={handleSubmit}>
					<input
						className='user-search__input'
						type='text'
						name='query'
						value={query}
						onChange={handleChange}
						placeholder='Search users...'
					/>
					<button type='submit' className='user-search__button'>
						Search
					</button>
				</form>

				{users.length > 0 && (
					<button
						type='button'
						className='user-clear__button'
						onClick={() => dispatch({ type: 'CLEAR_USERS' })}
					>
						Clear
					</button>
				)}
			</div>

			{alert && <Alert msg={alert?.msg} type={alert?.type} />}
		</div>
	);
};

export default UserSearch;
