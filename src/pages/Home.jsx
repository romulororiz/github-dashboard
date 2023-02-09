import UserSearch from '@components/users/UserSearch';
import UserResults from '@components/users/UserResults';
import '@styles/scss/pages/Home.scss';

const Home = () => {
	return (
		<div className='home'>
			<UserSearch />
			<UserResults />
		</div>
	);
};

export default Home;
