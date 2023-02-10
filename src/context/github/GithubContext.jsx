import { createContext, useReducer } from 'react';
import axios from 'axios';

import githubReducer from './GithubReducer';

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

// create a github instance
const github = axios.create({
	baseURL: GITHUB_URL,
	headers: {
		Authorization: `token ${GITHUB_TOKEN}`,
	},
});

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		followers: [],
		following: [],
		repos: [],
		loading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	// Search users
	const searchUsers = async query => {
		const params = new URLSearchParams({
			q: query,
		});

		const response = await github.get(`/search/users?${params}`);

		const items = response.data.items;

		if (items.length === 0) {
			dispatch({
				type: 'USER_NOT_FOUND',
				payload: `user ${query} does not exist`,
			});

			setTimeout(() => dispatch({ type: 'CLEAR_ERROR' }), 3000);
		}

		dispatch({
			type: 'GET_USERS',
			payload: items,
		});
	};

	// Get user and repos
	const getUserAndRepos = async login => {
		const [user, repos] = await Promise.all([
			github.get(`/users/${login}`),
			github.get(`/users/${login}/repos`),
		]);

		dispatch({
			type: 'GET_USER_AND_REPOS',
			payload: {
				user: user.data,
				repos: repos.data,
			},
		});
	};

	// Get user
	const getUser = async login => {
		const response = await github.get(`/users/${login}`);

		dispatch({
			type: 'GET_USER',
			payload: response.data,
		});
	};

	// Get user followers
	const getUserFollowers = async login => {
		const response = await github.get(`/users/${login}/followers`);

		dispatch({
			type: 'GET_FOLLOWERS',
			payload: response.data,
		});
	};

	// Get user following
	const getUserFollowing = async login => {
		const response = await github.get(`/users/${login}/following`);

		dispatch({
			type: 'GET_FOLLOWING',
			payload: response.data,
		});
	};

	// sort repos by stars
	const sortReposByStars = (repos, order) => {
		if (order === 'asc') {
			return repos.sort((a, b) => a.stargazers_count - b.stargazers_count);
		} else {
			return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
		}
	};

	return (
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
				searchUsers,
				getUserAndRepos,
				getUser,
				getUserFollowers,
				getUserFollowing,
				sortReposByStars,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
