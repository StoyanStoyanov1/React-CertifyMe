import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from "../services/authService.js";
import Path from "../paths.js";
import * as profilService from '..//services/profilService.js'
import usePersistedState from "../hooks/usePersistedState.js";

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}) => {
	const navigate = useNavigate();

	const [auth, setAuth] = usePersistedState('auth', {});

	const registerSubmitHandler = async (values) => {
		const result = await authService.register(values.email, values.password, values.accName);
		setAuth(result);
		localStorage.setItem('accessToken', result.accessToken);

		await profilService.create({fullName: values.fullName, imgUrl: values.imgUrl, description:values.description,})

		navigate(Path.Home);
	}

	const loginSubmitHandler = async values => {
		const result = await authService.login(values.email, values.password);

		setAuth(result);
		localStorage.setItem('accessToken', result.accessToken);
		navigate(Path.Home)
	};

	const logoutHandler = () => {
		setAuth({});
		localStorage.removeItem('accessToken');
		navigate(Path.Home);
	}

	const values = {
		registerSubmitHandler,
		loginSubmitHandler,
		logoutHandler,
		accName: auth.accName,
		email: auth.email,
		_id: auth._id,
		isAuthenticated: !!auth.email,
	};
	return (
		<AuthContext.Provider value={values}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext