import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import {useNavigate} from "react-router-dom";
import * as profilService from "../../services/profilService.js"
import Path from "../../paths.js";

export default function MyProfil() {
	const navigate = useNavigate();
	const {_id} = useContext(authContext);

	const [profiles, setProfiles] = useState([]);

	useEffect(() => {
		profilService.getAll().then(res => setProfiles(res));
	}, []);

	useEffect(() => {
		const profil = profiles.find(profil => profil._ownerId === _id);
		if (profil) {
			navigate(`${Path.Profil}/${profil._id}`)
		}

	}, [profiles, _id, navigate]);

}