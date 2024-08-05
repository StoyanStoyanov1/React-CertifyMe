import { useContext, useEffect, useState } from "react";
import authContext from "../../context/authContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import * as profilService from '../../services/profilService.js';
import * as chatService from '../../services/chatService.js';
import Path from '../../paths.js';
import useLoadingText from "../useLoadingText.jsx";

export default function FindChat() {
	const navigate = useNavigate();
	const { _id } = useContext(authContext); // Get the current user ID from the context
	const { receiver } = useParams(); // Get the receiver ID from the URL parameters

	const [chat, setChat] = useState(null); // State to hold the chat object
	const [isLoading, setIsLoading] = useState(false); // State to manage loading status

	const loadingText = useLoadingText(isLoading);
	// useEffect to handle finding or creating a chat when component mounts or _id changes
	useEffect(() => {
		sendToChat();
	}, [_id]);

	// Function to find or create a chat between the sender and receiver
	async function sendToChat() {
		try {
			const sender = await profilService.getByUserId(_id); // Get the sender profile

			let chat = await chatService.getBySenderAndReceiver(sender._id, receiver); // Try to find an existing chat

			if (!chat) {
				chat = await chatService.create({ sender: sender._id, receiver: receiver }); // Create a new chat if none exists
			}

			setChat(chat); // Set the chat state
			setIsLoading(true); // Set loading to true

			navigate(`${Path.Chat}/${chat._id}`); // Navigate to the chat page

		} catch (err) {
			setIsLoading(true); // Set loading to true
			console.log(err); // Log the error
		}
	}

	return (
		<section id='catalogPage'>
			{isLoading ? <p>Please try again</p> : <p>{loadingText}</p>} {/* Display loading or error message */}
		</section>
	);
}
