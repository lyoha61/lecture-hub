import CameraIcon from "../assets/camera.svg?react";
import { useRef, useEffect, useState } from "react";

export const LectureScreen: React.FC<{ stream: MediaStream | null }> = ({ stream }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isStream, setIsStream] = useState(false);

	useEffect(() => {
		if (stream && videoRef.current) {
			videoRef.current.srcObject = stream;
			videoRef.current.play().catch(() => {});
			setIsStream(true)
		} 

		return () => {
			stream?.getTracks().forEach(track => track.stop());
			if (videoRef.current) videoRef.current.srcObject = null
			setIsStream(false)
		}
	}, [stream]);

	return (
		<div className="flex flex-col gap-7 bg-[#ffffff] border-2 border-[#E5E7EB] rounded-xl p-5 w-[50%]">
			<div className="flex justify-between">
				<h2>Трансляция лекции</h2>
				<div className="flex gap-3 items-center text-[#6B7280]">
					<div className={`h-2 rounded-full aspect-square ${
						isStream ? 'bg-[#22C55E]' : 'bg-[#9CA3AF]'
					}` }/>
					{isStream ? 'Идет трансляция' : 'Не записывает'} 
				</div>
			</div>
			<div className="flex justify-center bg-[#1F2937] w-[100%] h-[60%] rounded-xl text-[#9CA3AF]">
				{stream 
					? <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted />
					: (
						<div className="flex flex-col justify-center items-center w-[80%]">
							<CameraIcon className="w-10" />
							<span>Трансляция лекции появится здесь</span>
						</div>
					)
				}
			</div>
		</div>
	)
}