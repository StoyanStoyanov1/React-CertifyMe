import {useContext} from "react";
import authContext from "../../context/authContext.jsx";
import {Navigate, Outlet} from "react-router-dom";
import Path from "../../paths.js";

export default function AuthGuard() {
	const {isAuthenticated} = useContext(authContext);

	if(!isAuthenticated) {
		return <Navigate to={Path.Login}/>
	}

	return <Outlet/>
}