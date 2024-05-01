import paths from "../../paths.js";
import {useEffect, useState} from "react";
import * as certificateServer from '../../services/sertificateService.js'
import CertificateItem from "./CertificateItem.jsx";
import {Link} from "react-router-dom";
import Path from "../../paths.js";

export default function MyCertificates() {
	const [certificates, setCertificates] = useState([]);

	useEffect(() => {
		certificateServer.getAll()
			.then(result => setCertificates(result))
	}, []);

	return (
		<section id="catalogPage">
			<h1>My certificates</h1>

			{certificates.map(cer => (
				<CertificateItem key={cer._id} {...cer}/>
			))}

			{certificates.length === 0 && (<p>No found certificates!</p>)}

		</section>
	)
}