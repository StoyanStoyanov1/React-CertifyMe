import {useContext, useEffect, useState} from "react";
import * as certificateServer from '../../services/certificateService.js'
import CertificateItem from "./CertificateItem.jsx";


export default function AllCertificate() {
	const [certificates, setCertificates] = useState([]);

	useEffect(() => {
		certificateServer.getAll()
			.then(result => setCertificates(result))
	}, []);



	return (
		<section id="catalogPage">
			<h1>All Certificate</h1>

			{certificates.length === 0 ? (
				<p>No found certificates!</p>) : certificates.map(cer => (<CertificateItem key={cer._id} {...cer}/>
			))}

		</section>
	)
}