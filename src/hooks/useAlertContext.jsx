import { useContext } from 'react';
import AlertContext from '@context/alert/AlertContext';

export const useAlertContext = () => {
	const context = useContext(AlertContext);

	if (!context) {
		throw new Error(
			'useAlertContext must be used inside a AlertContextProvider'
		);
	}

	return context;
};
