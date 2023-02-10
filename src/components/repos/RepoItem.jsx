import { BiLink } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { TbGitFork } from 'react-icons/tb';
import '@styles/scss/components/repos/RepoItem.scss';

const RepoItem = ({ repo }) => {
	const {
		name,
		description,
		stargazers_count,
		forks_count,
		watchers_count,
		html_url,
	} = repo;

	return (
		<div className='repo-item'>
			<div className='repo-item-info'>
				<a
					href={html_url}
					target='_blank'
					rel='noreferrer'
					className='repo-item-name'
				>
					<BiLink />
					<p>{name}</p>
				</a>
				<div className='repo-item-description'>
					<p>{description}</p>
				</div>
			</div>
			<div className='repo-item-stats'>
				<div className='repo-item-stats-item'>
					<AiFillStar className='icon repo-icon-stars' />
					<p>{stargazers_count}</p>
				</div>
				<div className='repo-item-stats-item'>
					<TbGitFork className='icon repo-icon-forks' />
					<p>{forks_count}</p>
				</div>
				<div className='repo-item-stats-item'>
					<FaEye className='icon repo-icon-watchers' />
					<p>{watchers_count}</p>
				</div>
			</div>
		</div>
	);
};

export default RepoItem;
