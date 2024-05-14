import {Link} from "react-router-dom";
import Path from "../../paths.js";

export default function ItemsProfile({
											_id,
											_ownerId,
											fullName,
											imgUrl,
										}) {


	return (
		<div className="card-box">
			<img src={imgUrl}
				 alt='img`'/>

			<div>
				<div className="text-center">
					<p className="name">{fullName}</p>
				</div>
				<div className="btn-group">
					<Link to={`${Path.Profil}/${_id}`} id="more">Learn more...</Link>
				</div>
			</div>
		</div>
	)
}