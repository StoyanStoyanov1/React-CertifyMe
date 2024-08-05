import {useNavigate, useParams} from "react-router-dom";
import * as CertificateServer from '../../services/certificateService.js'
import Path from "../../paths.js";
import {useContext, useEffect} from "react";
import authContext from "../../context/authContext.jsx";

export default function RemoveCertificate() {
	const navigate = useNavigate();
	const {certificateId} = useParams();
	const {_id} = useContext(authContext);

	useEffect(async () => {
		try {
			await CertificateServer.remove(certificateId);
			navigate(Path.AllCertificate);
		} catch(err) {
			console.log(err);
			navigate(Path.AllCertificate);
		}
	}, []);

}