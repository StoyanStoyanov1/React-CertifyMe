import Path from "../../paths.js";
import {Link, useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import * as CertificateServer from "../../services/certificateService.js"
import authContext from "../../context/authContext.jsx";
import noCertificate from "../../../public/images/noCertificate.jpg";
import * as profilService from "../../services/profilService.js";

export default function CertificateDetails() {
		const {_id} = useContext(authContext);
		const [cer, setCer] = useState({});
		const {certificateId} = useParams();
		const [fullName, setFullName] = useState("");

	useEffect(() => {
		CertificateServer.getOne(certificateId)
			.then(data =>
			{setCer(data)
			})
			.catch(error => console.log(error));


	}, [certificateId]);

	useEffect(() => {
		profilService.getOne(_id)
			.then(data => setFullName(data.fullName))
			.catch(err => console.log(err));
	}, []);
	return (
		<section id="detailsPage">
			<div className="wrapper">
				<div className="certificateCover">
					<img src={cer.imgUrl || noCertificate} alt={cer.title}/>
				</div>
				<div className="certificateInfo">
					<div className="certificateText">

						<h1>{fullName}</h1>
						<h3>{cer.start} - {cer.end}</h3>
						<h4>{cer.title}</h4>
						<h4>University: {cer.university}</h4>
						<p>{cer.description}</p>
					</div>

					{cer._ownerId === _id &&
					<div className="actionBtn">
						<Link to={`${Path.EditCertificate}/${certificateId}`} className="edit">Edit</Link>
						<Link to={`${Path.Remove}/${certificateId}`} className="remove">Delete</Link>
					</div>
					}
				</div>
			</div>
		</section>
	)
}