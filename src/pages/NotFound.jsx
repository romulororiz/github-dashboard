import { FiAlertTriangle } from 'react-icons/fi';
import '@styles/scss/pages/NotFound.scss';

const NotFound = () => {
	return (
		<div className='not-found'>
			<FiAlertTriangle />
			<h1>Not Found</h1>
		</div>
	);
};

export default NotFound;
