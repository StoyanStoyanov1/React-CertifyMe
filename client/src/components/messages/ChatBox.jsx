import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import * as profilService from "../../services/profilService.js";
import * as chatService from "../../services/chatService.js";
import * as messageService from "../../services/messageService.js";
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
							const receiveProfil = await profilService.getOne(receiverId);
							const lastMessage = await messageService.getOne(chat.messages[chat.messages.length - 1]);
							chat.lastMessage = lastMessage;
							chat.receiverProfil = receiveProfil;

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


	function formatDate(dateString) {
		const date = new Date(dateString);
		const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
		return date.toLocaleDateString('de-DE', options);
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
						<p>{chat.lastMessage.message.substring(0, 15)}{chat.lastMessage.message.length > 10 && ' ...'}</p>
					</div>
					<span className="chat-time">{formatDate(chat.lastMessage.createdAt)}</span>
				</div>))}

			</div>
		</div>
	)
}