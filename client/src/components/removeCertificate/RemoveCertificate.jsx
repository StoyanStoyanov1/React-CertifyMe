import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import * as CertificateServer from '../../services/certificateService.js';
import Path from "../../paths.js";
import authContext from "../../context/authContext.jsx";

export default function RemoveCertificate() {
	const navigate = useNavigate();
	const { certificateId } = useParams();
	const { _id } = useContext(authContext);

	useEffect(() => {
			CertificateServer.remove(certificateId)
				.then(() => navigate(`${Path.MyCertificates}/${_id}`))
				.catch((err) => {
					console.log(err);
					navigate(`${Path.MyCertificates}/${_id}`);
				});
	}, [certificateId, _id, navigate]);
}
