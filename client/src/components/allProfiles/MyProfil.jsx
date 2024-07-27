import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import {useNavigate} from "react-router-dom";
import * as profilService from "../../services/profilService.js";
import Path from "../../paths.js";

export default function MyProfil() {
	const navigate = useNavigate();
	const {_id} = useContext(authContext); // Get the current user ID from the context

	const [profiles, setProfiles] = useState([]); // State to hold all profiles

	// Fetch all profiles when the component mounts
	useEffect(() => {
		profilService.getAll().then(res => setProfiles(res));
	}, []);

	// Check if the current user owns a profile and navigate to their profile page
	useEffect(() => {
		const profil = profiles.find(profil => profil._ownerId === _id);
		if (profil) {
			navigate(`${Path.Profil}/${profil._id}`);
		}
	}, [profiles, _id, navigate]); // Run the effect when profiles, _id, or navigate changes

}
