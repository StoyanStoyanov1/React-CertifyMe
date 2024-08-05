import {useContext, useEffect, useState} from "react";
import * as certificateServer from '../../services/certificateService.js';
import CertificateItem from "./CertificateItem.jsx";
import AuthContext from "../../context/authContext.jsx";
import {useParams} from "react-router-dom";
import useLoadingText from "../useLoadingText.jsx";

export default function MyCertificates() {
	const [certificates, setCertificates] = useState([]); // State to hold the list of certificates
	const {_id} = useContext(AuthContext); // Get the current user ID from the Auth context
	const {userId} = useParams(); // Get the user ID from the URL parameters
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const textLoading = useLoadingText(isLoading);
	// Fetch certificates for the given user ID when the component mounts
	useEffect(() => {
		certificateServer.getAllUserId(userId)
			.then(result => {
				setCertificates(result);
				setIsLoading(false);
			})
			.catch(err => {
				console.log(err);
				setIsLoading(false);
				setError('Something went wrong! Please try again.');

			})// Update the certificates state with the fetched data
	}, [userId]);

	return (
		<section id="catalogPage">
			<h1>My certificates</h1>

			{isLoading ? <p>{textLoading}</p> : error ? <p>{error}</p> :certificates.length === 0 ? (
				<p>No found certificates!</p> // Show message if no certificates are found
			) : (
				certificates.map(cer => (
					<CertificateItem key={cer._id} {...cer} /> // Render each certificate item
				))
			)}
		</section>
	);
}
