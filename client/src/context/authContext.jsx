import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from "../services/authService.js";
import Path from "../paths.js";
import usePersistedState from "../hooks/usePersistedState.js";

// Create the AuthContext
const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

// AuthProvider component to provide authentication state and handlers
export const AuthProvider = ({children}) => {
	const navigate = useNavigate();
	const [auth, setAuth] = usePersistedState('auth', {});

	// Handler for user registration
	const registerSubmitHandler = async (values) => {
		const result = await authService.register(
			values.email,
			values.password,
			values.username,
			values.fullName,
			values.imgUrl,
			values.description,
		);

		// Check if accessToken is returned and update auth state
		if (result.accessToken) {
			setAuth(result.user);
			localStorage.setItem('accessToken', result.accessToken);
			navigate(Path.Home);
		} else {
			console.error('No access token returned');
		}
	};

	// Handler for user login
	const loginSubmitHandler = async (values) => {
		const result = await authService.login(values.email, values.password);
		setAuth(result.user);
		localStorage.setItem('accessToken', result.accessToken);
		navigate(Path.Home);
	};

	// Handler for user logout
	const logoutHandler = () => {
		setAuth({});
		localStorage.removeItem('accessToken');
		navigate(Path.Home);
	};

	// Values to be provided by AuthContext
	const values = {
		registerSubmitHandler,
		loginSubmitHandler,
		logoutHandler,
		username: auth.username,
		email: auth.email,
		_id: auth._id,
		isAuthenticated: !!auth.email,
	};

	return (
		<AuthContext.Provider value={values}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
