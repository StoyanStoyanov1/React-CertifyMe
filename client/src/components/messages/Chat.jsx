import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import {useParams} from "react-router-dom";
import * as profilService from '../../services/profilService.js';
import * as chatService from '../../services/chatService.js';
import * as messageService from '../../services/messageService.js'

export default function Chat() {
	const {_id} = useContext(authContext);
	const {chatId} = useParams();
	const [chat, setChat] = useState([]);

	const [senderProfil, setSenderProfil] = useState([]);
	const [receiverProfil, setReceiverProfil] = useState([])
	const [message, setMessage] = useState('');
	const [classMessage, setClassMessage] = useState('isCorrect');
	const [countMessage, setCountMessage] = useState(200);

	const findProfiles = async (senderId, receiverId) => {
		try {
			const sender = await profilService.getOne(senderId);
			const receiver = await profilService.getOne(receiverId);

			setSenderProfil(sender);
			setReceiverProfil(receiver);
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
	}, []);

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

		const senderId = _id;
		const receiverId = profilId;

		try {
			const newMessage = await messageService.create({message, sender: senderId, receiver: receiverId});

		} catch (err) {
			console.log(err);
		}

	}
	return (
		<section>
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Message Box</legend>

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
	)
}