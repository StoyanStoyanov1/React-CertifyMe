import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService.js";
import Path from "../paths.js";
import usePersistedState from "../hooks/usePersistedState.js";

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [auth, setAuth] = usePersistedState('auth', {});

	const registerSubmitHandler = async (values) => {
		try {
			const result = await authService.register(
				values.email,
				values.password,
				values.username,
				values.fullName,
				values.imgUrl,
				values.description,
			);
			console.log('Register result:', result); // Проверете резултата в конзолата
			if (result.accessToken) {
				setAuth(result.user);
				localStorage.setItem('accessToken', result.accessToken);
				navigate(Path.Home);
			} else {
				console.error('No access token returned');
			}
		} catch (error) {
			console.error('Error during registration:', error);
		}
	};
	const loginSubmitHandler = async (values) => {
		try {
			const result = await authService.login(values.email, values.password);
			setAuth(result.user);
			localStorage.setItem('accessToken', result.accessToken);
			navigate(Path.Home);
		} catch (error) {
			console.error('Error during login:', error);
		}
	};

	const logoutHandler = () => {
		setAuth({});
		localStorage.removeItem('accessToken');
		navigate(Path.Home);
	};

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
