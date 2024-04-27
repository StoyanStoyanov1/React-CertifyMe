import Path from "../../paths.js";

export default function Header() {
	return(
		<header>
			<nav>
				<a href={Path.Home}>CertifyMe</a>
				<ul>
					<li><a href="#">Мy certificates</a></li>
					<li><a href={Path.Login}>Login</a></li>
					<li><a href={Path.Register}>Register</a></li>
					<li><a href="#">Add certificate</a></li>
					<li><a href="#">Logout</a></li>
				</ul>
			</nav>
		</header>
	)
}

