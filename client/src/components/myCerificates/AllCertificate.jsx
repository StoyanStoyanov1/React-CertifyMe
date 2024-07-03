import React, { useEffect, useState } from "react";
import * as certificateServer from '../../services/certificateService.js';
import CertificateItem from "./CertificateItem.jsx";
import Pagination from "./Pagination";

export default function AllCertificate() {
	const [certificates, setCertificates] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(1);

	useEffect(() => {
		certificateServer.getAll()
			.then(result => setCertificates(result));
	}, []);

	// Get current certificates
	const indexOfLastCertificate = currentPage * itemsPerPage;
	const indexOfFirstCertificate = indexOfLastCertificate - itemsPerPage;
	const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLastCertificate);

	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	return (
		<section id="catalogPage">
			<h1>All Certificates</h1>

			{currentCertificates.length === 0 ? (
				<p>No found certificates!</p>
			) : (
				currentCertificates.map(cer => (
					<CertificateItem key={cer._id} {...cer} />
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
