import {useContext, useEffect, useState, useRef} from "react";
import authContext from "../../context/authContext.jsx";
import {useParams} from "react-router-dom";
import * as profilService from '../../services/profilService.js';
import * as chatService from '../../services/chatService.js';
import * as messageService from '../../services/messageService.js';

export default function Chat() {
	const {_id} = useContext(authContext);
	const {chatId} = useParams();
	const [chat, setChat] = useState([]);

	const [senderProfil, setSenderProfil] = useState([]);
	const [receiverProfil, setReceiverProfil] = useState([]);
	const [message, setMessage] = useState('');
	const [classMessage, setClassMessage] = useState('isCorrect');
	const [countMessage, setCountMessage] = useState(200);
	const [messages, setMessages] = useState([]);

	const messagesEndRef = useRef(null);
	const [isLoaded, setIsLoaded] = useState(false)

	const scrollToBottom = (behavior = "auto") => {
		messagesEndRef.current?.scrollIntoView({behavior});
	};

	const findProfiles = async (senderId, receiverId) => {
		try {
			const sender = await profilService.getOne(senderId);
			const receiver = await profilService.getOne(receiverId);

			setSenderProfil(sender.userId === _id ? sender: receiver);
			setReceiverProfil(sender.userId !== _id? sender: receiver);
			setIsLoaded(true)
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		chatService.getById(chatId)
			.then(foundChat => {
				setChat(foundChat);
				findProfiles(foundChat.sender, foundChat.receiver);
			})
			.catch(err => console.log(err));

	}, [chatId]);

	useEffect(() => {
		if (isLoaded) {

			chat.messages?.forEach(async (messageId) => {
				const message = await messageService.getOne(messageId);
				message.senderName = message.sender === senderProfil._id ? senderProfil.fullName : receiverProfil.fullName;

				setMessages((prevState) => [...prevState, message]);
			});
		}
	}, [chat, senderProfil, receiverProfil]);
	useEffect(() => {
		scrollToBottom("auto");
	}, [messages]);

	const onChange = async (e) => {
		const newMessage = e.target.value;

		if (newMessage.length > 200) {
			setClassMessage('isNotCorrect');
			return;
		}

		setMessage(e.target.value);
		setCountMessage(200 - newMessage.length);
		setClassMessage('isCorrect');
	}

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
		} catch (err) {
			console.log(err);
		}
	}

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