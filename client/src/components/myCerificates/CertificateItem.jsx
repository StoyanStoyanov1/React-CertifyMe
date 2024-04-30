import paths from "../../paths.js";
import {Link} from "react-router-dom";
import Path from "../../paths.js";
import CertificateDetails from "../certificateDetails/CertificateDetails.jsx";

export default function CertificateItem({
											id,
											title,
											start,
											end,
											university,
											imageUrl,
											description,
										}) {
	return(

		<div className="card-box">
			<img src={imageUrl}
				 alt='Python OOP`'/>

			<div>
				<div className="text-center">
					<p className="name">Name: Kiril Madzharov</p>
					<p className="title">Title: {title}</p>
					<p className="date">Date: {start} - {end}</p>
					<p className="university">University: {university}</p>
				</div>
				<div className="btn-group">
					<Link to={CertificateDetails} id="details">Detail</Link>
				</div>

			</div>

		</div>

	)
}