import {Link} from "react-router-dom";
import paths from "../../paths.js";

export default function CertificateItem({
											_id,
											title,
											start,
											end,
											university,
											imageUrl,
										}) {


	return (

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
					<Link to={`${paths.MyCertificates}/${_id}`} id="details">Detail</Link>
						</div>
						</div>
						</div>

						)
					}