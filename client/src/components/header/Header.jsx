import Path from "../../paths.js";
import {Link} from "react-router-dom";
import Login from "../login/Login.jsx";
import {useContext} from "react";
import authContext from "../../context/authContext.jsx";

export default function Header() {
	const {
		isAuthenticated,
		username,
		_id,
	} = useContext(authContext)

	return(
		<header>
			<nav>
				<Link to={Path.Home}>CertifyMe</Link>
				<Link to={Path.AllCertificate}>All Certificate</Link>
				<Link to={Path.AllProfiles}>All profiles</Link>
				{isAuthenticated && (<ul>
						<li><Link to={`${Path.MyCertificates}/${_id}`}>Мy certificates</Link></li>
						<li><Link to={Path.AddCertificate}>Add certificate</Link></li>
						<li><Link to={Path.Logout}>Logout</Link></li>
						<li><Link to={`${Path.MyProfil}/${_id}`}>{username}</Link></li>
					</ul>
					)}

				{!isAuthenticated && (<ul>
						<li><Link to={Path.Login}>Login</Link></li>
						<li><Link to={Path.Register}>Register</Link></li>
					</ul>
				)}

			</nav>
		</header>
	)
}

