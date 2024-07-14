import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import {useParams} from "react-router-dom";
import * as profilService from '../../services/profilService.js';
import * as chatService from '../../services/chatService.js';

export default function CreateNewChat() {
	const {_id} = useContext(authContext);
	const {profilId} = useParams();

	const [senderProfil, setSenderProfil] = useState([]);
	const [receiverProfil, setReceiverProfil] = useState([])


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

	const onSubmit = async (e) => {
		e.preventDefault();

		const senderId = _id;
		const receiverId = profilId;

		try {
			const newChat = await chatService.create({sender: senderId, receiver: receiverId});
		} catch (err) {
			console.log(err);
		}

	}
	return (
		<section>
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>New Message</legend>

					<div className='input-container'>
						<label htmlFor='titel' className='vhide'>Message</label>
						<input
						id='title'
						className='title'
						placeholder='Titel'
						/>

						<label htmlFor='meesage' className='vhide'>Message</label>
						<textarea
						id="message"
						className="message"
						placeholder={`Write your message to ${receiverProfil.fullName}`}
						/>
					</div>

					<div className="button-container">
						<button className="new-message">Send</button>
					</div>
				</fieldset>
			</form>
		</section>
	)
}