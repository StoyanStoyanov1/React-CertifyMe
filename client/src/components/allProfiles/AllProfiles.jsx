import {useContext, useEffect, useState} from "react";
import * as profilService from '../../services/profilService.js';

export default function AllProfiles() {
	const [profiles, setProfiles] = useState([]);

	useEffect(() => {
		profilService.getAll().then(result => setProfiles(result));
	}, []);

	return (
		<section id='catalogPage'>
			<h1>All Profiles</h1>

			{profiles.length === 0 ? <p>No found Profiles!</p>: <p></p>}
		</section>
	)

}