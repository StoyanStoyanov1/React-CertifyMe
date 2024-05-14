import {useContext, useEffect, useState} from "react";
import * as certificateServer from '../../services/certificateService.js'
import CertificateItem from "./CertificateItem.jsx";
import {Link} from "react-router-dom";
import Path from "../../paths.js";
import AuthContext from "../../context/authContext.jsx";

export default function MyCertificates() {
	const [certificates, setCertificates] = useState([]);
	const {_id} = useContext(AuthContext);

	useEffect(() => {
		certificateServer.getAll()
			.then(result => setCertificates(result))
	}, []);

	const myCertificates = certificates.filter(cer => cer._ownerId === _id);

	return (
		<section id="catalogPage">
			<h1>My certificates</h1>

			{myCertificates.length === 0 ? (
				<p>No found certificates!</p>) : myCertificates.map(cer => (<CertificateItem key={cer._id} {...cer}/>
			))}

		</section>
	)
}