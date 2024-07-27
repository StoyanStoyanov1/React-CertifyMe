import {useContext} from "react";
import authContext from "../../context/authContext.jsx";
import {Navigate, Outlet} from "react-router-dom";
import Path from "../../paths.js";

// AuthGuard component to protect routes that require authentication
export default function AuthGuard() {
	// Get the authentication status from the auth context
	const {isAuthenticated} = useContext(authContext);

	// If the user is not authenticated, navigate to the login page
	if (!isAuthenticated) {
		return <Navigate to={Path.Login}/>
	}

	// If the user is authenticated, render the child routes
	return <Outlet/>
}
