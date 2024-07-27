import {useContext, useEffect, useState} from "react";
import * as certificateServer from '../../services/certificateService.js';
import CertificateItem from "./CertificateItem.jsx";
import AuthContext from "../../context/authContext.jsx";
import {useParams} from "react-router-dom";

export default function MyCertificates() {
	const [certificates, setCertificates] = useState([]); // State to hold the list of certificates
	const {_id} = useContext(AuthContext); // Get the current user ID from the Auth context
	const {userId} = useParams(); // Get the user ID from the URL parameters

	// Fetch certificates for the given user ID when the component mounts
	useEffect(() => {
		certificateServer.getAllUserId(userId)
			.then(result => setCertificates(result)); // Update the certificates state with the fetched data
	}, [userId]);

	return (
		<section id="catalogPage">
			<h1>My certificates</h1>

			{certificates.length === 0 ? (
				<p>No found certificates!</p> // Show message if no certificates are found
			) : (
				certificates.map(cer => (
					<CertificateItem key={cer._id} {...cer} /> // Render each certificate item
				))
			)}
		</section>
	);
}
