import Path from "../../paths.js";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import authContext from "../../context/authContext.jsx";
import * as profilService from "../../services/profilService.js";

export default function Header() {
	const {
		isAuthenticated,
		username,
		_id,
	} = useContext(authContext); // Get the authentication status and user information from the context

	const [profil, setProfil] = useState([]); // State to hold profile data

	// Fetch user profile data on component mount or when the user ID or location changes
	useEffect(() => {
		profilService.getByUserId(_id)
			.then(profil => setProfil(profil))
			.catch(err => console.log(err));
	}, [_id, location.pathname]);

	// Function to determine the class for navigation links
	const getNavLinkClass = (path) => {
		if (path === Path.ChatBox) {
			return location.pathname.includes(Path.ChatBox) ? 'nav-link active' : 'nav-link';
		}
		return location.pathname === path ? 'nav-link active' : 'nav-link';
	};

	return(
		<header>
			<nav>
				<Link className={getNavLinkClass(Path.Home)} to={Path.Home}>CertifyMe</Link>
				<Link className={getNavLinkClass(Path.AllCertificate)} to={Path.AllCertificate}>Certificates</Link>
				<Link className={getNavLinkClass(Path.AllProfiles)} to={Path.AllProfiles}>Users</Link>
				{isAuthenticated && (
					<ul>
						<li>
							<Link className={getNavLinkClass(Path.ChatBox)} to={`${Path.ChatBox}/${_id}`}>
								Chat {profil.unreadChats && profil.unreadChats.length > 0 && <span className='unread-messages-count'>{profil.unreadChats.length}</span>}
							</Link>
						</li>
						<li><Link className={getNavLinkClass(Path.AddCertificate)} to={Path.AddCertificate}>Add certificate</Link></li>
						<li><Link to={Path.Logout}>Logout</Link></li>
						<li><Link className={getNavLinkClass(`${Path.MyProfil}/${_id}`)} to={`${Path.MyProfil}/${_id}`}>{username}</Link></li>
					</ul>
				)}
				{!isAuthenticated && (
					<ul>
						<li><Link className={getNavLinkClass(Path.Login)} to={Path.Login}>Login</Link></li>
						<li><Link className={getNavLinkClass(Path.Register)} to={Path.Register}>Register</Link></li>
					</ul>
				)}
			</nav>
		</header>
	)
}
