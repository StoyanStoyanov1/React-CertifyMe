import {useContext, useEffect} from "react";
import * as authService from '../../services/authService.js';
import {useNavigate} from "react-router-dom";
import authContext from "../../context/authContext.jsx";
import Path from "../../paths.js";

export default function Logout() {
	const navigate = useNavigate();
	const {logoutHandler} = useContext(authContext); // Get the logout handler from the auth context

	// useEffect to handle the logout process
	useEffect(() => {
		authService.logout() // Call the logout service
			.then(() => {
				logoutHandler(); // Call the context logout handler
				navigate(Path.Home); // Navigate to the home page after successful logout
			})
			.catch(() => navigate(Path.Home)); // Navigate to the home page if logout fails
	}, [logoutHandler, navigate]);

	return null; // This component does not render anything
}
