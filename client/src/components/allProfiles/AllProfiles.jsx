import {useContext, useEffect, useState} from "react";
import * as profilService from '../../services/profilService.js';
import ItemsProfile from "./ItemsProfile.jsx";
import Pagination from "../myCerificates/Pagination.jsx";

export default function AllProfiles() {
	// State to hold the list of profiles
	const [profiles, setProfiles] = useState([]);
	// State to handle the current page for pagination
	const [currentPage, setCurrentPage] = useState(1);
	// State to set the number of items per page for pagination
	const [itemsPerPage, setItemsPerPage] = useState(8);
	// State to manage the loading state
	const [isLoading, setIsLoading] = useState(true);

	// Fetch all profiles on component mount
	useEffect(() => {
		profilService.getAll()
			.then(result => {
				setProfiles(result);
				setIsLoading(false);
			});
	}, []);

	// Calculate the indexes for slicing the profiles array for pagination
	const indexOfLastProfile = currentPage * itemsPerPage;
	const indexOfFirstProfil = indexOfLastProfile - itemsPerPage;
	const currentProfiles = profiles.slice(indexOfFirstProfil, indexOfLastProfile);

	// Function to handle page change for pagination
	const paginate = pageNumber => setCurrentPage(pageNumber);

	return (
		<section id='catalogPage'>
			<h1>Users</h1>
			{isLoading ?
				<p>Loading...</p>
				:
				profiles.length === 0 ?
					<p>No found Users!</p>
					:
					profiles.map(profil => <ItemsProfile key={profil._id} {...profil}/>)
			}
			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={profiles.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</section>
	);
}
