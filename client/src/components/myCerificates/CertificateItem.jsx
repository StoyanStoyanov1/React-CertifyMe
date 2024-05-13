import {Link} from "react-router-dom";
import paths from "../../paths.js";

export default function CertificateItem({
											_id,
											title,
											name,
											firstName,
											lastName,
											start,
											end,
											university,
											imgUrl,
										}) {


	return (

		<div className="card-box">
			<img src={imgUrl}
				 alt='Python OOP`'/>

			<div>
				<div className="text-center">
					<p className="name">{firstName} - {lastName}</p>
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