import '@styles/scss/components/layout/Footer.scss';

const Footer = () => {
	return (
		<div className='footer'>
			&copy; {new Date().getFullYear()} - Romulo Roriz
		</div>
	);
};

export default Footer;
