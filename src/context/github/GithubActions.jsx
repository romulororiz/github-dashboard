import axios from 'axios';

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

// create a github instance
const github = axios.create({
	baseURL: GITHUB_URL,
	headers: {
		Authorization: `token ${GITHUB_TOKEN}`,
	},
});

// Search users
export const searchUsers = async query => {
	const params = new URLSearchParams({
		q: query,
	});

	const response = await github.get(`/search/users?${params}`);

	const items = response.data.items;

	if (items.length === 0) {
		window.location = '/notfound';
	}

	return items;
};

// Get user and repos
export const getUserAndRepos = async login => {
	const [user, repos] = await Promise.all([
		github.get(`/users/${login}`),
		github.get(`/users/${login}/repos`),
	]);

	if (user.status === 404) {
		window.location = '/notfound';
	} else {
		return {
			user: user.data,
			repos: repos.data,
		};
	}
};

// Get user
export const getUser = async login => {
	const response = await github.get(`/users/${login}`);

	return response.data;
};

// Get user followers
export const getUserFollowers = async login => {
	const response = await github.get(`/users/${login}/followers`);

	return response.data;
};

// Get user following
export const getUserFollowing = async login => {
	const response = await github.get(`/users/${login}/following`);

	return response.data;
};

