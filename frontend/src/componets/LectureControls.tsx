import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../services/SocketContext';
import { useLectureSocket } from '../hooks/useLectureSocket';
import StartIcon from '../assets/play.svg?react';
import PauseIcon from '../assets/pause.svg?react';
import CopyIcon from '../assets/copy.svg?react';

export const LectureControls: React.FC<{ setStream: (stream: MediaStream | null ) => void }> = ({ setStream }) => {
	const { socket } = useSocket();
	const [isLectureStarted, setIsLectureStarted] = useState(false);
	const { createLecture, onLectureCreated } = useLectureSocket();
	const [lectureId, setLectureId] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const handleStartLecture = async () => {
		if (!socket) return;

		if (isLectureStarted) {
			setIsLectureStarted(false);
			setLectureId(null);
			setStream(null);
			return
		}
		
		createLecture()
		onLectureCreated((id) => {
			setLectureId(id)
		})
		setIsLectureStarted(true);


		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
			setStream(stream);
		} catch (err) {
			console.error("Ошибка при запуске трансляции", err);
		}
	}

	const handleCopy = () => {
		if (!lectureId) return;
		navigator.clipboard.writeText(lectureId);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}

	//  #TODO: сделать сообщение об успешном копировании

	return (
		<div className="lecture-panel">
			<div className="flex flex-col py-6 gap-5 border-b-1 border-[#E5E7EB]">
				<h2 className='text-xl'>Элементы управления</h2>
				<button 
					className={`flex items-center justify-center gap-2 text-[#ffffff] py-4 px-6 rounded-lg cursor-pointer ${
						isLectureStarted ? 'bg-gradient-to-br from-[#e21c34] to-[#500b2b]' : 'bg-gradient-to-br from-[#ccffaa] to-[#1e5b53]'
					}`}
					onClick={handleStartLecture}
				>
					<div className='w-7 flex justify-center'>
						<AnimatePresence mode="wait">
							{isLectureStarted 
								? (
									<motion.div
										key="pause"
										initial={{ opacity: 0, scale: 0.5 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.5 }}
									>
										<PauseIcon className='w-6 text-[#ffffff] fill-current' /> 
									</motion.div>
								)
								: (
									<motion.div
										key="play"
										initial={{ opacity: 0, scale: 0.5 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity:0, scale: 0.5 }}
									>
										<StartIcon className='w-3.5' />
									</motion.div>
								)
							}
						</AnimatePresence>
					</div>
					<AnimatePresence mode='wait'>
						<motion.span
							key={isLectureStarted ? 'stop' : 'start'}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity:1, y:0 }}
							exit={{ opacity:0, y: -10 }}
							transition={{ duration: 0.15 }}
						>
						{isLectureStarted ? 'Остановить' : 'Начать'} лекцию
						</motion.span>
					</AnimatePresence>
				</button>
			</div>

			<div className='flex flex-col gap-2 py-4 border-b-1 border-[#E5E7EB]'>
				<span>Номер лекции</span>
				<div className='flex justify-between bg-[#202020] p-4 rounded-xl border-1 border-[#E5E7EB] text-[#ffffff]'>
					{lectureId ? lectureId : 'Лекция не запущена'}
					{lectureId && (
						<button
							onClick={handleCopy}
						>
							<CopyIcon className='w-6 fill-current cursor-pointer'/> 
						</button>
					)}

				</div>

			</div>
			
			<div>
				<h3>Подключенные студенты</h3>
			</div>

		</div>
	)
} 