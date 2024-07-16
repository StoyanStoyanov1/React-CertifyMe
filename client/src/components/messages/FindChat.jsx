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

	const [chat, setChat] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [senderIsLoading, setSenderIsLoading] = useState(false);

	useEffect(() => {
		sendToChat();
	}, [_id]);


	async function sendToChat() {

		try {
			const sender = await profilService.getByUserId(_id);

			let chat = await chatService.getBySenderAndReceiver(sender._id, receiver);

			if (!chat) {
				chat = await chatService.create({ sender: sender._id, receiver: receiver });
			}

			setChat(chat);
			setIsLoading(true);

			navigate(`${Path.Chat}/${chat._id}`);

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
