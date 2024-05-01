import {useContext, useEffect} from "react";

import * as authService from '../../services/authService.js';
import {useNavigate} from "react-router-dom";
import authContext from "../../context/authContext.js";
import Path from "../../paths.js";

export default function Logout() {
	const navigate = useNavigate();
	const {logoutHandler} = useContext(authContext);
	useEffect(() => {
		authService.logout()
			.then(() => logoutHandler())
			.catch(() => navigate(Path.Home))
	}, []);

	return null;
}