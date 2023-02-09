import { useAlertContext } from '@hooks/useAlertContext';
import '@styles/scss/components/layout/Alert.scss';

const Alert = ({ msg }) => {
	const { alert } = useAlertContext();

	return (
		<div className='alert'>
			<p>{msg}</p>
		</div>
	);
};

export default Alert;
