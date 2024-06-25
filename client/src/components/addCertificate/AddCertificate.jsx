import { useNavigate } from "react-router-dom";
import * as certificateService from '../../services/certificateService.js'
import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import * as profilService from '../../services/profilService.js'

export default function AddCertificate() {
	const navigate = useNavigate();
	const { _id } = useContext(authContext);
	const [profil, setProfiles] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await profilService.getByUserId(_id);
				setProfiles(result);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		fetchData();
	}, [_id]);

	console.log(profil)

	const createCertificateSubmitHandler = async (e) => {
		e.preventDefault();

		const fullName = profil.fullName

		console.log(fullName)

		const certificateData = Object.fromEntries(new FormData(e.currentTarget));
		try {
			await certificateService.create({
				...certificateData,
				fullName,
			});
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section className="createPage">
			<form onSubmit={createCertificateSubmitHandler}>
				<fieldset>
					<div className="container">
						<label htmlFor="title" className="vhide">Title</label>
						<input id="title" name="title" className="title" type="text" placeholder="Title"/>

						<label htmlFor="start" className="vhide">Start</label>
						<input id="start" name="start" className="start" type="text" placeholder="Start"/>

						<label htmlFor="end" className="vhide">End</label>
						<input id="end" name="end" className="end" type="text" placeholder="End"/>

						<label htmlFor="university" className="vhide">University</label>
						<input id="university" name="university" className="university" type="text"
							   placeholder="University"/>

						<label htmlFor="imgUrl" className="vhide">Image Url</label>
						<input id="imgUrl" name="imgUrl" className="imgUrl" type="text" placeholder="Image Url"/>

						<label htmlFor="description" className="vhide">Description</label>
						<textarea name="description" className="description" placeholder="Description"></textarea>

						<button className="add-album" type="submit">Add Certificate</button>
					</div>
				</fieldset>
			</form>
		</section>
	)
}
