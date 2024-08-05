import Path from "../../paths.js";
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import * as CertificateServer from "../../services/certificateService.js";
import authContext from "../../context/authContext.jsx";
import noCertificate from "../../../public/images/noCertificate.jpg";
import * as profilService from "../../services/profilService.js";
import useLoadingText from "../useLoadingText.jsx";

export default function CertificateDetails() {
	const {_id} = useContext(authContext); // Get the current user ID from the context
	const [cer, setCer] = useState({}); // State to hold certificate details
	const {certificateId} = useParams(); // Get the certificate ID from URL parameters
	const [profil, setProfil] = useState({}); // State to hold profile details
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const loadingText = useLoadingText(isLoading);
	// Fetch certificate and profile data when the component mounts or certificateId changes
	useEffect(() => {
		CertificateServer.getOne(certificateId)
			.then(data => {
				setCer(data);
				profilService.getOne(data.profilId)
					.then(data => {
						setProfil(data);
						setIsLoading(false);
					})
					.catch(err => {
						console.log(err);
						setIsLoading(false);
						setError('Something went wrong! Please try again.');
					})
			})
			.catch(error => console.log(error));
	}, [certificateId]);

	return (
		<section id="detailsPage">
			<div className="wrapper">
				{isLoading ? <p>{loadingText}</p> :
					error ? <p>{error}</p> : <>
						<div className="certificateCover">
							<img src={cer.imgUrl || noCertificate} alt={cer.title}/>
						</div>
						<div className="certificateInfo">
							<div className="certificateText">
								<h1>{profil.fullName}</h1>
								<h3>{cer.start} - {cer.end}</h3>
								<h4>{cer.title}</h4>
								<h4>University: {cer.university}</h4>
								<p>{cer.description}</p>
							</div>

							{profil.userId === _id ? (
								<div className="actionBtn">
									<Link to={`${Path.EditCertificate}/${certificateId}`} className="edit">Edit</Link>
									<Link to={`${Path.Remove}/${certificateId}`} className="remove">Delete</Link>
								</div>
							) : (
								<div className="actionBtn">
									<Link to={`${Path.Profil}/${profil.userId}`} className="edit">Profil</Link>
								</div>
							)}
						</div>
					</>
				}

			</div>
		</section>
	);
}
