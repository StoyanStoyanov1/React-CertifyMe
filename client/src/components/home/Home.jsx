import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import * as profilService from "../../services/profilService.js";
import ItemsProfile from "../allProfiles/ItemsProfile.jsx";

export default function Home() {
	const {_id} = useContext(authContext); // Get the current user ID from the context

	const [profiles, setProfiles] = useState([]); // State to hold the top profiles
	const [isLoading, setIsLoading] = useState(true); // State to manage loading status

	// Fetch the top three profiles when the component mounts
	useEffect(() => {
		profilService.getTopThree()
			.then(result => {
				setProfiles(result);
				setIsLoading(false); // Set loading to false after data is fetched
			})
			.catch(err => console.log('No found profiles!', err));
	}, []);

	return (
		<>
			<section id="welcomePage">
				<div id="welcome-message">
					<h1>Welcome to CertifyMe,</h1>
					<p>you can create a profile in which you can write information about yourself, upload your
						certificates, and send them to friends and employers.</p>
				</div>
			</section>

			<div className='top-profiles'>
				<section id='catalogPage'>
					<h1>These are the top 3 users with the most likes.</h1>
					{isLoading ? <p>Loading...</p> : profiles.length === 0 ? <p>No found Users!</p> : profiles.map(profil => <ItemsProfile
						key={profil._id} {...profil}/>)}
				</section>
			</div>
		</>
	);
}
