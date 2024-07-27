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
	// State to handle image loading status
	const [imageLoaded, setImageLoaded] = useState(false);

	// Count the number of likes for the profile
	const countLikes = likes ? likes.length : 0;

	// Handle image load success
	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	// Handle image load error
	const handleImageError = () => {
		setImageLoaded(false);
	};

	return (
		<div className="card-box">
			<img
				src={imageUrl || profilImg}
				alt='Profile'
				onLoad={handleImageLoad}
				onError={handleImageError}
				style={{
					width: '15em',
					height: '22em',
					objectFit: 'cover',
					display: imageLoaded ? 'block' : 'none'
				}}
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
