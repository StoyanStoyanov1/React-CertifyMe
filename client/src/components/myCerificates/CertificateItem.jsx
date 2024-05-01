import {Link} from "react-router-dom";
import Path from "../../paths.js";

export default function CertificateItem({
											_id,
											title,
											start,
											end,
											university,
											imageUrl,
											description,
										}) {

	sessionStorage.setItem('certificateDetails', JSON.stringify({ title, start, end, university, imageUrl, description }));

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
					<Link to={Path.CertificateDetail} id="details">Detail</Link>
						</div>
						</div>
						</div>

						)
					}