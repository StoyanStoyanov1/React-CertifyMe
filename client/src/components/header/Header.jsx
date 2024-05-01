import Path from "../../paths.js";
import {Link} from "react-router-dom";
import Login from "../login/Login.jsx";
import {useContext} from "react";
import authContext from "../../context/authContext.js";

export default function Header() {
	const {
		isAuthenticated,
		firstName,
	} = useContext(authContext)

	console.log(firstName)
	return(
		<header>
			<nav>
				<Link to={Path.Home}>CertifyMe</Link>

				{isAuthenticated && (<ul>
						<li><Link to={Path.MyCertificates}>Мy certificates</Link></li>
						<li><Link to={Path.AddCertificate}>Add certificate</Link></li>
						<li><Link to={Path.Logout}>Logout</Link></li>
						<span>{firstName}</span>
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

