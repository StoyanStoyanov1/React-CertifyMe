import {Link} from "react-router-dom";
import Path from "../../paths.js";
import profilImg from "../../../public/images/profilImg.jpg"

export default function ItemsProfile({
											_id,
											_ownerId,
											fullName,
											imageUrl,
											userId,
										}) {


	return (
		<div className="card-box">
			<img src={imageUrl || profilImg}
				 alt='img`'/>

			<div>
				<div className="text-center">
					<p className="name">{fullName}</p>
				</div>
				<div className="btn-group">
					<Link to={`${Path.MyProfil}/${userId}`} id="more">Learn more...</Link>
				</div>
			</div>
		</div>
	)
}