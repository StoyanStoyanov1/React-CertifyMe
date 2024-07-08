import { Link, useParams } from "react-router-dom";
import Path from "../../paths.js";
import { useContext, useEffect, useState } from "react";
import * as profilService from '../../services/profilService.js';
import profilImg from '../../../public/images/profilImg.jpg';
import authContext from "../../context/authContext.jsx";
import isLiked from "./isLiked.js";

export default function DetailProfil() {
	const { _id } = useContext(authContext);
	const [profil, setProfil] = useState({});
	const { profilId } = useParams();

	useEffect(() => {
		profilService.getByUserId(profilId)
			.then(result => setProfil(result));
	}, [profilId]);

	const handleLike = (userId, command) => {
		profilService.edit(userId, profilId)
			.then(() => {
				setProfil(prevState => ({
					...prevState,
					likes: command === 'like'
						? [...prevState.likes, userId]
						: prevState.likes.filter(user => user !== userId)
				}));
			});
	};

	return (
		<section id="detailsPage">
			<div className="wrapper">
				<div className="certificateCover">
					<img src={profil.imageUrl || profilImg} alt={profil.fullName} />
				</div>
				<div className="certificateInfo">
					<div className="certificateText">
						<h1>{profil.fullName}</h1>
						<p>{profil.description}</p>
						<Link className='my-certificates' to={`${Path.MyCertificates}/${profil.userId}`}>My Certificates</Link>
					</div>

					<div className="actionBtn">
						{profil.userId !== _id && (!isLiked(_id, profil.userId, profil.likes)
							? <button className='like-button' onClick={() => handleLike(_id, 'like')}>Like</button>
							: <button className='like-button' onClick={() => handleLike(_id, 'dislike')}>Dislike</button>)}
						{profil.userId === _id && <Link to={`${Path.EditProfile}/${profilId}`} className="edit">Edit</Link>}
					</div>
				</div>
			</div>
		</section>
	);
}
