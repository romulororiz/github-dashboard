import { FiAlertCircle } from 'react-icons/fi';
import '@styles/scss/components/layout/Alert.scss';

const Alert = ({ msg }) => {
	return (
		<div className='alert'>
			<FiAlertCircle />
			<p>{msg}</p>
		</div>
	);
};

export default Alert;
