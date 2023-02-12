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
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	// Search users
	const getUsers = async query => {
		const params = new URLSearchParams({
			q: query,
		});

		const response = await github.get(`/search/users?${params}&per_page=100`);

		if (response.data.items.length === 0) {
			throw new Error(`user '${query}' not found`);
		}

		if (response.status !== 200) {
			throw new Error(`Failed to fetch users`);
		}

		dispatch({
			type: 'GET_USERS',
			payload: response.data.items,
		});
	};

	// Get user and repos
	const getRepos = async login => {
		const response = await github.get(`/users/${login}/repos?per_page=100`);

		if (response.status !== 200) {
			throw new Error(`Failed to fetch repos for ${login}`);
		}

		dispatch({
			type: 'GET_REPOS',
			payload: response.data,
		});
	};

	// Get user
	const getUser = async login => {
		const response = await github.get(`/users/${login}`);

		console.log(response);
		if (response.status !== 200) {
			throw new Error(`Failed to fetch user ${login}`);
		}

		dispatch({
			type: 'GET_USER',
			payload: response.data,
		});
	};

	// Get user followers
	const getUserFollowers = async login => {
		const response = await github.get(`/users/${login}/followers?per_page=100`);

		if (response.status !== 200) {
			throw new Error(`Failed to fetch followers for ${login}`);
		}

		dispatch({
			type: 'GET_FOLLOWERS',
			payload: response.data,
		});
	};

	// Get user following
	const getUserFollowing = async login => {
		const response = await github.get(`/users/${login}/following`);

		if (response.status !== 200) {
			throw new Error(`Failed to fetch following for ${login}`);
		}

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
				getUsers,
				getRepos,
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
