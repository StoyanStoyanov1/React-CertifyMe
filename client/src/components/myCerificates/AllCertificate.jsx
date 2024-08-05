import React, { useEffect, useState } from "react";
import * as certificateServer from '../../services/certificateService.js';
import CertificateItem from "./CertificateItem.jsx";
import Pagination from "./Pagination";
import useLoadingText from "../useLoadingText.jsx";

export default function AllCertificate() {
	const [certificates, setCertificates] = useState([]); // State to hold the list of certificates
	const [currentPage, setCurrentPage] = useState(1); // State to manage the current page for pagination
	const [itemsPerPage] = useState(8); // Number of items per page
	const [isLoading, setIsLoading] = useState(true); // State to manage loading status

	const loadingText = useLoadingText(isLoading);

	// Fetch all certificates when the component mounts
	useEffect(() => {
		certificateServer.getAll()
			.then(result => {
				setCertificates(result);
				setIsLoading(false); // Set loading to false after data is fetched
			});
	}, []);

	// Calculate the index of the first and last certificate for the current page
	const indexOfLastCertificate = currentPage * itemsPerPage;
	const indexOfFirstCertificate = indexOfLastCertificate - itemsPerPage;
	const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLastCertificate); // Get the certificates for the current page

	// Function to handle page change for pagination
	const paginate = pageNumber => setCurrentPage(pageNumber);

	return (
		<section id="catalogPage">
			<h1>Certificates</h1>
			const loadingText = useLoadingText(isLoading);


			{isLoading
				? <p>{loadingText}</p> // Show loading message while data is being fetched
				: currentCertificates.length === 0 ? (
					<p>No found certificates!</p> // Show message if no certificates are found
				) : (
					currentCertificates.map(cer => (
						<CertificateItem key={cer._id} {...cer} /> // Render each certificate item
					))
				)}

			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={certificates.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</section>
	);
}
