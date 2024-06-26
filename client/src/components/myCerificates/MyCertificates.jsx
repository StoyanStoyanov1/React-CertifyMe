import {useContext, useEffect, useState} from "react";
import * as certificateServer from '../../services/certificateService.js'
import CertificateItem from "./CertificateItem.jsx";
import AuthContext from "../../context/authContext.jsx";

export default function MyCertificates() {
	const [certificates, setCertificates] = useState([]);
	const {_id} = useContext(AuthContext);

	useEffect(() => {
		certificateServer.getAllUserId(_id)
			.then(result => setCertificates(result))
	}, []);


	return (
		<section id="catalogPage">
			<h1>My certificates</h1>

			{certificates.length === 0 ? (
				<p>No found certificates!</p>) : certificates.map(cer => (<CertificateItem key={cer._id} {...cer}/>
			))}

		</section>
	)
}