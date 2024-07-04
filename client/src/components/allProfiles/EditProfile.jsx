import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as profilService from "../../services/profilService.js";
import Path from "../../paths.js";

const editProfileFormKeys = {
	AccountName: 'accName',
	FullName: 'fullName',
	ImageUrl: 'imageUrl',
	Description: 'description',
};

export default function EditProfile() {
	const navigate = useNavigate();
	const { profilId } = useParams();

	const [profil, setProfil] = useState({
		accName: '',
		fullName: '',
		imageUrl: '',
		description: ''
	});

	useEffect(() => {
		profilService.getOne(profilId)
			.then(result => setProfil(result))
			.catch(err => console.log(err));
	}, [profilId]);

	console.log(profil)
	const onChange = (e) => {
		setProfil(state => ({
			...state,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		profilService.edit(profil._id, profil)
			.then(() => navigate(`${Path.Profil}/${profilId}`))
			.catch(err => console.log(err));
	};

	return (
		<section className="editPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Edit Profil</legend>

					<div className="container">
						<label htmlFor="fullName" className="vhide">Full Name</label>
						<input
							id="fullName"
							name="fullName"
							className="fullName"
							type="text"
							placeholder="Full Name"
							value={profil[editProfileFormKeys.FullName]}
							onChange={onChange}
						/>

						<label htmlFor="imgUrl" className="vhide">Start</label>
						<input
							id="imgUrl"
							name="imgUrl"
							className="imgUrl"
							type="text"
							placeholder="Image Url"
							value={profil[editProfileFormKeys.ImageUrl]}
							onChange={onChange}
						/>

						<label htmlFor="description" className="vhide">Description</label>
						<textarea
							name="description"
							className="description"
							placeholder='Description'
							value={profil[editProfileFormKeys.Description]}
							onChange={onChange}
						/>

						<button className="edit-item" type="submit">Edit Certificate</button>
					</div>
				</fieldset>
			</form>
		</section>
	);
}
