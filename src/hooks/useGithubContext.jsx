import { useContext } from 'react';
import GithubContext from '@context/github/GithubContext';

export const useGithubContext = () => {
	const context = useContext(GithubContext);

	if (!context) {
		throw new Error(
			'useGithubContext must be used inside a GithubContextProvider'
		);
	}

	return context;
};
