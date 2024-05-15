import {Link} from "react-router-dom";
import Path from "../../paths.js";
import profilImg from "../../../public/images/profilImg.jpg"

export default function ItemsProfile({
											_id,
											_ownerId,
											fullName,
											imgUrl,
										}) {


	return (
		<div className="card-box">
			<img src={imgUrl || profilImg}
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