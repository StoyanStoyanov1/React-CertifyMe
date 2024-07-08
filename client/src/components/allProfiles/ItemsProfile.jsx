import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Path from "../../paths.js";
import profilImg from "../../../public/images/profilImg.jpg";
import * as profilService from "../../services/profilService.js"

export default function ItemsProfile({
										 _id,
										 _ownerId,
										 fullName,
										 imageUrl,
										 userId,
										 likes,
									 }) {
	const [imageLoaded, setImageLoaded] = useState(false);

	const countLikes = likes ? likes.length : 0;

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const handleImageError = () => {
		setImageLoaded(false);
	};

	return (
		<div className="card-box">
			<img
				src={imageUrl || profilImg}
				alt='Profile'
				style={{ display: imageLoaded ? 'block' : 'none' }}
				onLoad={handleImageLoad}
				onError={handleImageError}
			/>
			{!imageLoaded && (
				<img src={profilImg} alt="Placeholder" />
			)}
			<div>
				<div className="text-center">
					<p className="name">{fullName}</p>
					<p>Likes: {countLikes}</p>
				</div>
				<div className="btn-group">
					<Link to={`${Path.Profil}/${userId}`} id="more">Learn more...</Link>
				</div>
			</div>
		</div>
	);
}
