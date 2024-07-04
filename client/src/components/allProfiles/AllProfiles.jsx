import {useContext, useEffect, useState} from "react";
import * as profilService from '../../services/profilService.js';
import ItemsProfile from "./ItemsProfile.jsx";


export default function AllProfiles() {
	const [profiles, setProfiles] = useState([]);

	useEffect(() => {
		profilService.getAll().then(result => setProfiles(result));
	}, []);

	return (
		<section id='catalogPage'>
			<h1>Users</h1>

			{profiles.length === 0 ? <p>No found Users!</p>: profiles.map(profil => <ItemsProfile key={profil._id} {...profil}/>)}
		</section>
	)

}