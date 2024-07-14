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

	useEffect(() => {

	}, []);
	useEffect(() => {
		profilService.getByUserId(_id)
			.then(result => setSenderProfil(result))
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		profilService.getOne(profilId)
			.then(result => setReceiverProfil(result))
			.catch(err => console.log(err));
	})

	const onChange = async (e) => {
		setMessage(e.target.value);
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
					</div>

					<div className="button-container">
						<button className="new-message" type='submit'>Send</button>
					</div>
				</fieldset>
			</form>
		</section>
	)
}