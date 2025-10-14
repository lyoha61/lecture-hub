import { useNavigate } from 'react-router-dom';
import  Logo from '../assets/logo.svg?react';

export const Header: React.FC = () => {
	const navigate = useNavigate();

	return(
		<div className="flex bg-[#ffffff] text-[#000000] w-full py-4 px-6">
			<div 
				className='flex gap-3.5 cursor-pointer'
				onClick={() => navigate('/')}
			>
				<div className='flex w-8 h-8 rounded bg-[#374151] items-center justify-center px-2'>
					<Logo className='text-[#ffffff] fill-current' />
				</div>
				<h1 className='text-xl'>
					LectureHub
				</h1>
			</div>
		</div>
	)
}