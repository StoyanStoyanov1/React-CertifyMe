import { useContext, useEffect, useState } from "react";
import authContext from "../../context/authContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import * as profilService from '../../services/profilService.js';
import * as chatService from '../../services/chatService.js';
import Path from '../../paths.js'

export default function FindChat() {
	const navigate = useNavigate();

	const { _id } = useContext(authContext);
	const { receiver } = useParams();

	const [sender, setSender] = useState({});
	const [chat, setChat] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		profilService.getByUserId(_id)
			.then(result => setSender(result))
			.catch(err => console.log(err));
	}, [_id]);

	useEffect(() => {
		if (sender._id) {
			sendToChat(sender._id, receiver);
		}
	}, [sender, receiver]);

	async function sendToChat(senderId, receiverId) {
		try {
			let chat = await chatService.getBySenderAndReceiver(senderId, receiverId);

			if (!chat) {
				chat = await chatService.create({ sender: senderId, receiver: receiverId });
			}

			navigate(`${Path.Chat}/${chat._id}`);

			setChat(chat);
			setIsLoading(true);
		} catch (err) {
			setIsLoading(true);
			console.log(err);
		}
	}

	return (
		<section id='catalogPage'>
			{isLoading ? <p>Please try again</p> : <p>Loading...</p>}

		</section>
	)
}
