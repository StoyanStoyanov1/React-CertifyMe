import {useNavigate, useParams} from "react-router-dom";
import * as CertificateServer from '../../services/certificateService.js'
import Path from "../../paths.js";

export default function RemoveCertificate() {
	const navigate = useNavigate();
	const {certificateId} = useParams();
	CertificateServer.remove(certificateId).
		then(() => navigate(Path.MyCertificates))
		.catch((err) => {
			console.log(err);
			navigate(Path.MyCertificates);
		})




}