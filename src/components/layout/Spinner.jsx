import '@styles/scss/components/layout/Spinner.scss';

const Spinner = () => {
	return (
		<div className='sk-chase mt-20 w-100 mx-auto text-center'>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
		</div>
	);
};
export default Spinner;
