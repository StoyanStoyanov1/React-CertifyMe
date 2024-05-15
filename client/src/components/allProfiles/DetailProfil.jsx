import {Link, useParams} from "react-router-dom";
import Path from "../../paths.js";
import {useContext, useEffect, useState} from "react";
import * as profilService from '../../services/profilService.js';
import profilImg from '../../../public/images/profilImg.jpg'
import authContext from "../../context/authContext.jsx";

export default function DetailProfil() {
	const {_id} = useContext(authContext);
	const [profil, setProfil] = useState({});
	const {profilId} = useParams();

	useEffect(() => {
		profilService.getOne(profilId)
			.then(result => setProfil(result));
	}, [profilId]);

	return (
		<section id="detailsPage">
			<div className="wrapper">
				<div className="certificateCover">
					<img src={profil.imgUrl || profilImg} alt={profil.fullName}/>
				</div>
				<div className="certificateInfo">
					<div className="certificateText">

						<h1>{profil.fullName}</h1>
						<p>{profil.description}</p>
					</div>

					<div className="actionBtn">
						{profil._ownerId === _id && <Link to={`${Path.EditProfile}/${profilId}`} className="edit">Edit</Link>}

					</div>
				</div>
			</div>
		</section>
	)
}