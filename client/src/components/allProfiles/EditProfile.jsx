import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as profilService from "../../services/profilService.js";
import Path from "../../paths.js";

// Keys for form fields to match profile object keys
const editProfileFormKeys = {
	AccountName: 'accName',
	FullName: 'fullName',
	ImageUrl: 'imageUrl',
	Description: 'description',
};

export default function EditProfile() {
	const navigate = useNavigate();
	const { profilId } = useParams(); // Get the profile ID from URL parameters

	// State to hold profile data
	const [profil, setProfil] = useState({
		accName: '',
		fullName: '',
		imageUrl: '',
		description: ''
	});

	// Fetch profile data on component mount and when profilId changes
	useEffect(() => {
		profilService.getByUserId(profilId)
			.then(result => setProfil(result))
			.catch(err => console.log(err));
	}, [profilId]);

	// Handle input changes and update profile state
	const onChange = (e) => {
		setProfil(state => ({
			...state,
			[e.target.name]: e.target.value,
		}));
	};

	// Handle form submission and update profile data
	const onSubmit = (e) => {
		e.preventDefault();
		profilService.edit(profil._id, profil)
			.then(() => navigate(`${Path.Profil}/${profilId}`)) // Navigate to profile detail page after successful update
			.catch(err => console.log(err));
	};

	return (
		<section className="editPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Edit Profile</legend>

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

						<label htmlFor="imgUrl" className="vhide">Image Url</label>
						<input
							id="imageUrl"
							name="imageUrl"
							className="imageUrl"
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

						<button className="edit-item" type="submit">Edit Profile</button>
					</div>
				</fieldset>
			</form>
		</section>
	);
}
