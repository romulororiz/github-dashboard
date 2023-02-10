import { useEffect, useState } from 'react';
import { useGithubContext } from '@hooks/useGithubContext';
import { useAlertContext } from '@hooks/useAlertContext';
import Alert from '../layout/Alert';
import '@styles/scss/components/users/UserSearch.scss';

const UserSearch = () => {
	const [query, setQuery] = useState('');

	const { users, dispatch, searchUsers, error } = useGithubContext();

	const { setAlert, alert } = useAlertContext();

	const handleChange = e => setQuery(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();

		if (query === '') {
			setAlert('Please enter something');
		} else {
			dispatch({ type: 'SET_LOADING' });
			await searchUsers(query);
			setQuery('');
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
						onClick={() => {
							dispatch({ type: 'CLEAR_USERS' });
							setQuery('');
						}}
					>
						Clear
					</button>
				)}
			</div>

			{alert && <Alert msg={alert?.msg} />}
			{error && <Alert msg={error} />}
		</div>
	);
};

export default UserSearch;
