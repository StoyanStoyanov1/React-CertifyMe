import {useContext, useEffect, useState, useRef} from "react";
import authContext from "../../context/authContext.jsx";
import {useParams} from "react-router-dom";
import * as profilService from '../../services/profilService.js';
import * as chatService from '../../services/chatService.js';
import * as messageService from '../../services/messageService.js';
import {unread} from "../../services/chatService.js";

export default function Chat() {
	const {_id} = useContext(authContext); // Get the current user ID from the context
	const {chatId} = useParams(); // Get the chat ID from the URL parameters
	const [chat, setChat] = useState([]);
	const [senderProfil, setSenderProfil] = useState([]);
	const [receiverProfil, setReceiverProfil] = useState([]);
	const [message, setMessage] = useState('');
	const [classMessage, setClassMessage] = useState('isCorrect');
	const [countMessage, setCountMessage] = useState(200);
	const [messages, setMessages] = useState([]);

	const messagesEndRef = useRef(null); // Reference to the end of the messages for auto-scroll
	const [isLoaded, setIsLoaded] = useState(false);

	// Function to scroll to the bottom of the messages
	const scrollToBottom = (behavior = "auto") => {
		messagesEndRef.current?.scrollIntoView({behavior});
	};

	// Function to find the sender and receiver profiles
	const findProfiles = async (senderId, receiverId) => {
		try {
			const sender = await profilService.getOne(senderId);
			const receiver = await profilService.getOne(receiverId);

			setSenderProfil(sender.userId === _id ? sender : receiver);
			setReceiverProfil(sender.userId !== _id ? sender : receiver);
			setIsLoaded(true);
		} catch (err) {
			console.log(err);
		}
	};

	// Fetch chat data and find profiles when component mounts or chatId changes
	useEffect(() => {
		chatService.getById(chatId)
			.then(foundChat => {
				setChat(foundChat);
				findProfiles(foundChat.sender, foundChat.receiver);
			})
			.catch(err => console.log(err));
	}, [chatId]);

	// Fetch messages and mark as read if needed
	useEffect(() => {
		if (isLoaded) {
			if (senderProfil.unreadChats.includes(chatId)) {
				chatService.unread(senderProfil._id, chatId, 'read');
			}

			chat.messages?.forEach(async (messageId) => {
				const message = await messageService.getOne(messageId);
				message.senderName = message.sender === senderProfil._id ? senderProfil.fullName : receiverProfil.fullName;

				setMessages((prevState) => [...prevState, message]);
			});
		}
	}, [chat, senderProfil, receiverProfil]);

	// Auto-scroll to the bottom of the messages when messages change
	useEffect(() => {
		scrollToBottom("auto");
	}, [messages]);

	// Handle message input change
	const onChange = async (e) => {
		const newMessage = e.target.value;

		if (newMessage.length > 200) {
			setClassMessage('isNotCorrect');
			return;
		}

		setMessage(e.target.value);
		setCountMessage(200 - newMessage.length);
		setClassMessage('isCorrect');
	};

	// Handle form submission to send a new message
	const onSubmit = async (e) => {
		e.preventDefault();

		const senderId = senderProfil._id;
		const receiverId = receiverProfil._id;

		try {
			const newMessage = await messageService.create({
				chatId: chatId,
				message,
				sender: senderId,
				receiver: receiverId
			});

			newMessage.senderName = senderProfil.fullName;

			setMessages(prevMessages => [...prevMessages, newMessage]);

			setMessage('');
			setCountMessage(200);

			if (!receiverProfil.unreadChats.includes(chatId)) {
				await chatService.unread(receiverId, chatId, 'unread');
			}
		} catch (err) {
			console.log(err);
		}
	};

	// Function to format the date
	function formatDate(dateString) {
		const date = new Date(dateString);
		const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
		return date.toLocaleDateString('de-DE', options);
	}

	return (
		<section>
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Message Box</legend>
					<div className='chat'>
						<div className="message-display-box">
							<h2>{receiverProfil.fullName}</h2>
							<div className="message-container">
								{messages.map((msg, index) => (
									<div key={index} className="message-wrapper">
										<div className="message-header">
											<p className="sender-name">{msg.senderName}</p>
											<p className="message-date">{formatDate(msg.createdAt)}</p>
										</div>
										<div className="message">{msg.message}</div>
									</div>
								))}
								<div ref={messagesEndRef}/>
							</div>
						</div>
					</div>
					<div className='input-container'>
						<label htmlFor='message' className='vhide'>Message</label>
						<textarea
							id="message"
							name="message"
							className="message"
							onChange={onChange}
							value={message}
							placeholder={`Write your message to ${receiverProfil.fullName}`}
						/>
						<p className={classMessage}>Remaining characters: {countMessage}</p>
					</div>
					<div className="button-container">
						<button className="new-message" type='submit'>Send</button>
					</div>
				</fieldset>
			</form>
		</section>
	);
}
