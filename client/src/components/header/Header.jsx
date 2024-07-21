import Path from "../../paths.js";
import {Link} from "react-router-dom";
import {useContext} from "react";
import authContext from "../../context/authContext.jsx";

export default function Header() {
	const {
		isAuthenticated,
		username,
		_id,
	} = useContext(authContext)

	const getNavLinkClass = (path) => {
		return location.pathname === path ? 'nav-link active' : 'nav-link';
	};

	return(
		<header>
			<nav>
				<Link className={getNavLinkClass(Path.Home)} to={Path.Home}>CertifyMe</Link>
				<Link className={getNavLinkClass(Path.AllCertificate)} to={Path.AllCertificate}>Certificates</Link>
				<Link className={getNavLinkClass(Path.AllProfiles)} to={Path.AllProfiles}>Users</Link>
				{isAuthenticated && (<ul>
						<li><Link className={getNavLinkClass(`${Path.ChatBox}/${_id}`)} to={`${Path.ChatBox}/${_id}`}>Chat</Link></li>
						<li><Link className={getNavLinkClass(Path.AddCertificate)} to={Path.AddCertificate}>Add certificate</Link></li>
						<li><Link to={Path.Logout}>Logout</Link></li>
						<li><Link className={getNavLinkClass(`${Path.MyProfil}/${_id}`)} to={`${Path.MyProfil}/${_id}`}>{username}</Link></li>
					</ul>
				)}

				{!isAuthenticated && (<ul>
						<li><Link className={getNavLinkClass(Path.Login)} to={Path.Login}>Login</Link></li>
						<li><Link className={getNavLinkClass(Path.Register)} to={Path.Register}>Register</Link></li>
					</ul>
				)}

			</nav>
		</header>
	)
}

