const githubReducer = (state, action) => {
	switch (action.type) {
		case 'GET_USERS':
			return { ...state, users: action.payload, loading: false };
		case 'GET_REPOS':
			return {
				...state,
				repos: action.payload,
				loading: false,
			};
		case 'GET_USER':
			return { ...state, user: action.payload, loading: false };
		case 'GET_FOLLOWERS':
			return { ...state, followers: action.payload, loading: false };
		case 'GET_FOLLOWING':
			return { ...state, following: action.payload, loading: false };
		case 'SET_LOADING':
			return { ...state, loading: true };
		case 'CLEAR_LOADING':
			return { ...state, loading: false };
		case 'CLEAR_USERS':
			return { ...state, users: [], loading: false };
		case 'CLEAR_USER':
			return { ...state, user: {}, repos: [], loading: false };
		case 'CLEAR_FOLLOWERS':
			return { ...state, followers: [], loading: false };
		case 'CLEAR_FOLLOWING':
			return { ...state, following: [], loading: false };
		default:
			return state;
	}
};

export default githubReducer;
