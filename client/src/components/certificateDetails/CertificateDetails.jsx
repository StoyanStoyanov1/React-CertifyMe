import Path from "../../paths.js";
import {Link, useLocation} from "react-router-dom";

export default function CertificateDetails() {
	const details = JSON.parse(sessionStorage.getItem('certificateDetails') || '{}');
	sessionStorage.removeItem('certificateDetails')
	return (
		<section id="detailsPage">
			<div className="wrapper">
				<div className="certificateCover">
					<img src={details.imageUrl} alt={details.title}
						 />
				</div>
				<div className="certificateInfo">
					<div className="certificateText">

						<h1>Kiril Madzhanov</h1>
						<h3>{details.start} - {details.end}</h3>
						<h4>{details.title}</h4>
						<h4>University: {details.university}</h4>
						<p>${details.description}</p>
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