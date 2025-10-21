import { useState } from "react";
import EnterIcon from "../assets/enter.svg?react";
import { useLectureSocket } from "../hooks/useLectureSocket";

export const StudentPage: React.FC = () => {
	const { joinLecture } = useLectureSocket();
	const [lectureId, setLectureId] = useState("");

	const handleJoin = () => {
		if (lectureId?.trim()) {
			joinLecture(lectureId);
			console.log("Подключаемся к лекции: ", lectureId);
		} else {
			console.warn("Введите номер лекции");
		}
		setLectureId("");
	}

	return (
		<div className="lecture-panel flex flex-col gap-6 py-5">
			<span className="text-xl lg:text-2xl">Присоединиться к лекции</span>
			<div className="relative flex gap-5 ">
				<input 
				className="peer w-full sm:flex-1 bg-[#ffffff] border-1 border-[#D1D5DC] py-2 px-4 outline-none rounded-[10px]"
					type="text" 
					name="lectureId" 
					id="lecture-id" 
					value={lectureId}
					onChange={(e) => setLectureId(e.target.value)}
					placeholder=" "
				/>
				<label 
					className="absolute left-4 top-2 text-[#9DA2AE] transition-all text-xs md:text-sm lg:text-base
										peer-focus:-top-1/2  peer-focus:text-xs peer-focus:text-[#000000]
										peer-placeholder-shown:top-2
										peer-not-placeholder-shown:-top-1/2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#9DA2AE]
										"
					htmlFor="lecture-id">
						Введите номер лекции
					</label>
					<button 
						className="flex justify-center items-center rounded-xl sm:w-13 sm:h-auto w-[12%] bg-[#111827] text-[#ffffff] cursor-pointer"
						onClick={handleJoin}
					>
						<EnterIcon className="w-[30%]" />
					</button>
			</div>
			<div>
				Лекция: 
			</div>
		</div>
	)
}