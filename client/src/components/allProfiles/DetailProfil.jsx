import {Link, useNavigate, useParams} from "react-router-dom";
import Path from "../../paths.js";
import {useContext, useEffect, useState} from "react";
import * as profilService from '../../services/profilService.js';
import profilImg from '../../../public/images/profilImg.jpg';
import authContext from "../../context/authContext.jsx";
import isLiked from "./isLiked.js";

export default function DetailProfil() {
	const navigate = useNavigate();
	const {_id} = useContext(authContext); // Get the current user ID from the context
	const [profil, setProfil] = useState({});
	const {profilId} = useParams(); // Get the profile ID from the URL parameters
	const [countLikes, setCountLikes] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch the profile data when the component mounts or when the profile ID changes
	useEffect(() => {
		profilService.getByUserId(profilId)
			.then(result => setProfil(result));
	}, [profilId]);

	// Handle the like/unlike action
	const handleLike = (userId, command) => {
		profil.likes = profil.likes || [];
		if (command === 'like') {
			profil.likes.push(userId); // Add the user ID to the likes array
		} else {
			profil.likes = profil.likes.filter(user => user !== userId); // Remove the user ID from the likes array
		}

		profilService.edit(profil._id, profil)
			.then(() => navigate(`${Path.Profil}/${profilId}`)) // Navigate to the profile page after editing
			.catch(err => console.log(err));
	};

	// Update the count of likes when the profile data changes
	useEffect(() => {
		setCountLikes(profil.likes ? profil.likes.length : 0);
	}, [profil]);

	useEffect(() => {
		setIsLoading(false);
	})

	return (
		<section id="detailsPage">
			{isLoading ? <p>Loading...</p> : <div className="wrapper">

				<div className="certificateCover">
					<img src={profil.imageUrl || profilImg} alt={profil.fullName}/>
				</div>
				<div className="certificateInfo">
					<div className="certificateText">
						<h1>{profil.fullName}</h1>
						<p>{profil.description}</p>
						<Link className='my-certificates' to={`${Path.MyCertificates}/${profil.userId}`}>
							My Certificates
						</Link>
						<p>Likes: {countLikes}</p>
					</div>

					<div className="actionBtn">
						{_id && profil.userId !== _id && (
							!isLiked(_id, profil.userId, profil.likes)
								? <button className='like-button' onClick={() => handleLike(_id, 'like')}>Like</button>
								: <button className='like-button'
										  onClick={() => handleLike(_id, 'dislike')}>Unlike</button>
						)}
						{profil.userId === _id && (
							<Link to={`${Path.EditProfile}/${profilId}`} className="edit">Edit</Link>
						)}
						{_id && profil.userId !== _id && (
							<Link to={`${Path.Chat}/find-chat/${profil._id}`} className="message">Message</Link>
						)}
					</div>
				</div>
			</div>}

		</section>
	);
}
