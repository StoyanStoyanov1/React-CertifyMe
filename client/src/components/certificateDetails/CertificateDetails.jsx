import Path from "../../paths.js";
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as CertificateServer from "../../services/certificateService.js"

export default function CertificateDetails() {
		const [cer, setCer] = useState({});
		const {certificateId} = useParams();


	useEffect(() => {
		CertificateServer.getOne(certificateId)
			.then(data =>
			{setCer(data)
			console.log(data)
			})
			.catch(error => console.log(error));
	}, [certificateId]);
	return (
		<section id="detailsPage">
			<div className="wrapper">
				<div className="certificateCover">
					<img src={cer.imgUrl} alt={cer.title}/>
				</div>
				<div className="certificateInfo">
					<div className="certificateText">

						<h1>{cer.name}</h1>
						<h3>{cer.start} - {cer.end}</h3>
						<h4>{cer.title}</h4>
						<h4>University: {cer.university}</h4>
						<p>{cer.description}</p>
					</div>

					<div className="actionBtn">
						<Link to={Path.EditCertificate} className="edit">Edit</Link>
						<Link to={Path.MyCertificates} className="remove">Delete</Link>
					</div>
				</div>
			</div>
		</section>
	)
}