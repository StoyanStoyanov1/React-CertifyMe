import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import * as profilService from "../../services/profilService.js";
import * as chatService from "../../services/chatService.js";
import * as messageService from "../../services/messageService.js";
import {useNavigate} from "react-router-dom";
import Path from "../../paths.js";
import useLoadingText from "../useLoadingText.jsx";

export default function ChatBox() {
	const {_id} = useContext(authContext); // Get the current user ID from the context
	const navigate = useNavigate();

	const [profil, setProfil] = useState(null); // State to hold the user profile
	const [chats, setChats] = useState([]); // State to hold the list of chats

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const textLoading = useLoadingText(isLoading);
	// Fetch user profile data when the component mounts or the user ID changes
	useEffect(() => {
		profilService.getByUserId(_id)
			.then(result => {
				setProfil(result);
				setIsLoading(false);
			})
			.catch(err => {
				console.log(err);
				setIsLoading(false);
				setError('Something went wrong! Please try again.');
			});
	}, [_id]);

	// Fetch chat data and associated profiles and messages when the user profile is available
	useEffect(() => {
		if (profil) {
			profil.chats.forEach(async chatId => {
				try {
					const chat = await chatService.getById(chatId);
					const receiverId = chat.sender !== profil._id ? chat.sender : chat.receiver;
					const receiveProfil = await profilService.getOne(receiverId);
					const lastMessage = await messageService.getOne(chat.messages[chat.messages.length - 1]);
					chat.lastMessage = lastMessage;
					chat.receiverProfil = receiveProfil;

					setChats(prevChat => [...prevChat, chat]);
				} catch (err) {
					console.log(err);
				}
			});
		}
	}, [profil]);

	// Function to determine the class for chat items
	function classChatItem(chatId) {
		if (profil.unreadChats.includes(chatId)) {
			return 'chat-item unread';
		}
		return 'chat-item';
	}

	// Function to format the date for display
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
			{isLoading && <p>{textLoading}</p>}
			<div className="chat-list">
				{!isLoading &&  error ? <p>{error}</p> : chats.map(chat => (
					<div key={chat._id} onClick={() => navigate(`${Path.Chat}/${chat._id}`)} className={classChatItem(chat._id)}>
						<div className="chat-info">
							<h2>{chat.receiverProfil.fullName}</h2>
							<p>{chat.lastMessage.message.substring(0, 15)}{chat.lastMessage.message.length > 15 && ' ...'}</p>
						</div>
						<span className="chat-time">{formatDate(chat.lastMessage.createdAt)}</span>
					</div>
				))}
			</div>
		</div>
	);
}