import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import {useParams} from "react-router-dom";
import * as profilService from '../../services/profilService.js'

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

	return (
		<section>
			<form>
				<fieldset>
					<legend>New Message</legend>
					<div className='input-container'>
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