import {Link, useNavigate, useParams} from "react-router-dom";
import Path from "../../paths.js";
import {useContext, useEffect, useState} from "react";
import * as profilService from '../../services/profilService.js';
import profilImg from '../../../public/images/profilImg.jpg';
import authContext from "../../context/authContext.jsx";
import isLiked from "./isLiked.js";

export default function DetailProfil() {
	const navigate = useNavigate();
	const {_id} = useContext(authContext);
	const [profil, setProfil] = useState({});
	const {profilId} = useParams();
	const [countLikes, setCountLikes] = useState(0);

	useEffect(() => {
		profilService.getByUserId(profilId)
			.then(result => setProfil(result));
	}, [profilId]);

	const handleLike = (userId, command) => {
		profil.likes = profil.likes || [];
		if (command === 'like') {
			profil.likes.push(userId)
		} else {
			profil.likes = profil.likes.filter(user => user !== userId);
		}

		profilService.edit(profil._id, profil)
			.then(() => navigate(`${Path.Profil}/${profilId}`))
			.catch(err => console.log(err));

	};

	useEffect(() => {
		setCountLikes(profil.likes? profil.likes.length: 0)
	})

	return (
		<section id="detailsPage">
			<div className="wrapper">
				<div className="certificateCover">
					<img src={profil.imageUrl || profilImg} alt={profil.fullName}/>
				</div>
				<div className="certificateInfo">
					<div className="certificateText">
						<h1>{profil.fullName}</h1>
						<p>{profil.description}</p>
						<Link className='my-certificates' to={`${Path.MyCertificates}/${profil.userId}`}>My
							Certificates</Link>
						<p>Likes: {countLikes}</p>
					</div>

					<div className="actionBtn">
						{_id && profil.userId !== _id && (!isLiked(_id, profil.userId, profil.likes)
							? <button className='like-button' onClick={() => handleLike(_id, 'like')}>Like</button>
							: <button className='like-button'
									  onClick={() => handleLike(_id, 'dislike')}>Unlike</button>)}
						{profil.userId === _id &&
							<Link to={`${Path.EditProfile}/${profilId}`} className="edit">Edit</Link>}
						{_id && profil.userId !== _id &&
							<Link to={`${Path.NewMessage}/${profil._id}`} className="edit">Message</Link>}
					</div>
				</div>
			</div>
		</section>
	);
}
