import { useAlertContext } from '@hooks/useAlertContext';
import '@styles/scss/components/layout/Alert.scss';

const Alert = ({ msg, type }) => {
	const { alert } = useAlertContext();

	console.log(alert);

	return (
		<div className='alert'>
			<p>{msg}</p>
		</div>
	);
};

export default Alert;
