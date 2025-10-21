import { useNavigate } from "react-router-dom";
import WatchingManIcon from "../assets/watching-man.svg?react";
import PeopleIcon from "../assets/people.svg?react";
import GraphIcon from "../assets/graph.svg?react";
import TowerBroadCastIcon from "../assets/tower-broadcast.svg?react";
import StudentCapIcon from '../assets/logo.svg?react';
import BookIcon from '../assets/book.svg?react';
import MessagesIcon from '../assets/messages.svg?react';
import ClockIcon from '../assets/clock.svg?react';


export const ChooseRolePage: React.FC = () => {
	const navigate = useNavigate()

	return (
		<div className="flex items-center justify-center w-full h-full text-[#000000]">
			<div className="grid grid-cols-2 gap-7 w-[50%] h-[80%]">

				<div className="role-card">
					<div className="role-icon-container ">
						<WatchingManIcon className="role-icon" />
					</div>
					<h1 className="role-title">Я лектор</h1>
					<p className="role-info">
						Создавайте и управляйте интерактивными лекциями, делитесь контентом и взаимодействуйте со своими студентами в режиме реального времени без интернета.
					</p>

					<div>
						<ul className="role-features">
							<li className="role-feature-item">
								<TowerBroadCastIcon className="role-feature-icon" />
								Трансляция презентации
							</li>
							<li className="role-feature-item">
								<PeopleIcon className="role-feature-icon" />
								Управление учащимися
							</li>
							<li className="role-feature-item">
								<GraphIcon className="role-feature-icon" />
								Отслеживание активности
							</li>
						</ul>
					</div>

					<button
					className="role-button"
						onClick={() => navigate('/lecturer')}
					>
						Создать комнату
					</button>
				</div>

				<div className="role-card">
					<div className="role-icon-container">
						<StudentCapIcon className="role-icon"  />
					</div>
					<h1 className="role-title">Я студент</h1>
					<p className="role-info">
						Присоединяйтесь к лекциям в режиме реального времени, участвуйте в обсуждениях и получайте доступ к образованию без интернета.
					</p>

					<div className="role-features-container">
						<ul className="role-features">
							<li className="role-feature-item">
								<BookIcon className="role-feature-icon" />
								Доступ к материалам
							</li>
							<li className="role-feature-item">
								<MessagesIcon className="role-feature-icon" />
								Интерактивные обсуждения
							</li>
							<li className="role-feature-item">
								<ClockIcon className="role-feature-icon" />
								Обучение в режиме реального времени
							</li>
						</ul>
					</div>

					<button
						className="role-button"
						onClick={() => navigate('/student')}
					>
						Присоединиться к комнате
					</button>
				</div>
			</div>

		</div>
	)
}