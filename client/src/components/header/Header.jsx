import Path from "../../paths.js";
import {Link} from "react-router-dom";
import Login from "../login/Login.jsx";

export default function Header() {
	return(
		<header>
			<nav>
				<Link to={Path.Home}>CertifyMe</Link>
				<ul>
					<li><Link to={Path.MyCertificates}>Мy certificates</Link></li>
					<li><Link to={Path.Login}>Login</Link></li>
					<li><Link to={Path.Register}>Register</Link></li>
					<li><Link to={Path.AddCertificate}>Add certificate</Link></li>
					<li><Link to={'#'}>Logout</Link></li>
				</ul>
			</nav>
		</header>
	)
}

