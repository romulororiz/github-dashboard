import { FiAlertCircle } from 'react-icons/fi';

import '@styles/scss/components/layout/Error.scss';

const Error = ({ msg }) => {
	return (
		<div className='error'>
			<FiAlertCircle />
			<p>{msg}</p>
		</div>
	);
};

export default Error;
