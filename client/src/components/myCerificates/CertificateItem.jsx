import { useState } from 'react';
import { Link } from 'react-router-dom';
import paths from "../../paths.js";
import noCertificate from '../../../public/images/noCertificate.jpg';

export default function CertificateItem({
											_id,
											title,
											start,
											end,
											university,
											imgUrl,
											fullName
										}) {
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const handleImageError = () => {
		setImageLoaded(false);
	};

	return (
		<div className="card-box">
			<img
				src={imgUrl || noCertificate}
				alt="Certificate"
				style={{ display: imageLoaded ? 'block' : 'none' }}
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
