import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import paths from "../../paths.js";
import noCertificate from '../../../public/images/noCertificate.jpg';
import * as profilService from '../../services/profilService.js';

export default function CertificateItem({
											_id,
											title,
											start,
											end,
											university,
											imgUrl,
											profilId,
										}) {
	const [imageLoaded, setImageLoaded] = useState(false); // State to manage image loading status
	const [fullName, setFullName] = useState(''); // State to hold the profile's full name

	// Handle image load success
	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	// Handle image load error
	const handleImageError = () => {
		setImageLoaded(false);
	};

	// Fetch profile data when the component mounts or profilId changes
	useEffect(() => {
		profilService.getOne(profilId)
			.then(result => setFullName(result.fullName))
			.catch(() => setFullName(''));
	}, [profilId]);

	return (
		<div className="card-box">
			<img
				src={imgUrl || noCertificate}
				alt="Certificate"
				style={{
					width: '14em',
					height: '19em',
					objectFit: 'cover',
					display: imageLoaded ? 'block' : 'none'
				}}
				onLoad={handleImageLoad}
				onError={handleImageError}
			/>
			{!imageLoaded && (
				<img src={noCertificate} alt="Placeholder" />
			)}
			<div>
				<div className="text-center">
					<p className="name">{fullName}</p>
					<p className="title">Title: {title}</p>
					<p className="date">Date: {start} - {end}</p>
					<p className="university">University: {university}</p>
				</div>
				<div className="btn-group">
					<Link to={`${paths.MyCertificates}/${_id}/details`} id="details">Detail</Link>
				</div>
			</div>
		</div>
	);
}
