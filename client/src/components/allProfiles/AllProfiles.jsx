import {useContext, useEffect, useState} from "react";
import * as profilService from '../../services/profilService.js';
import ItemsProfile from "./ItemsProfile.jsx";
import Pagination from "../myCerificates/Pagination.jsx";


export default function AllProfiles() {

	const [profiles, setProfiles] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(8);
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		profilService.getAll()
			.then(result => {
				setProfiles(result);
				setIsLoading(false);
			})

			}, []);


		const indexOfLastProfile = currentPage * itemsPerPage;
		const indexOfFirstProfil = indexOfLastProfile - itemsPerPage;
		const currentProfiles = profiles.slice(indexOfFirstProfil, indexOfLastProfile);

		const paginate = pageNumber => setCurrentPage(pageNumber)

		return (
			<section id='catalogPage'>
				<h1>Users</h1>
				{isLoading ? <p>Loading...</p> : profiles.length === 0 ?
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
		)


}