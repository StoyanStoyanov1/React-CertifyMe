import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import * as profilService from "../../services/profilService.js"
import * as chatService from "../../services/chatService.js"
import {useNavigate} from "react-router-dom";
import Path from "../../paths.js";


export default function ChatBox() {
	const {_id} = useContext(authContext);
	const navigate = useNavigate();

	const [profil, setProfil] = useState(null);
	const [chats, setChats] = useState([]);

	useEffect(() => {
		profilService.getByUserId(_id)
			.then(result => setProfil(result))
			.catch(err => console.log(err))
	}, [_id]);

	useEffect(() => {
			if (profil) {
				profil.chats.forEach(async chatId => {
						try {
							const chat = await chatService.getById(chatId);
							const receiverId = chat.sender !== profil._id? chat.sender: chat.receiver;
							const receiverProfil = await profilService.getOne(receiverId);
							chat.receiverProfil = receiverProfil;
							setChats((prevChat => [...prevChat, chat]));
						} catch (err) {
							console.log(err)
						}
					}
				)
			}
		}
		,
		[profil]
	);

	async function getReceiverProfil(profilId) {
		const profil = await profilService.getOne(profilId);
		return profil.fullName
	}

	return (
		<div className="chat-list-container">
			<div className="chat-list-header">
				<h1>Chats</h1>
			</div>
			<div className="chat-list">
				{chats.map(chat => (<div onClick={() => navigate(`${Path.Chat}/${chat._id}`)} className="chat-item">
					<div className="chat-info">
						<h2>{chat.receiverProfil.fullName}</h2>
						<p>Last message...</p>
					</div>
					<span className="chat-time">10:30 AM</span>
				</div>))}

			</div>
		</div>
	)
}