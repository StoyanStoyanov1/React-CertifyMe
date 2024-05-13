import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from "../services/authService.js";
import Path from "../paths.js";

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}) => {
	const navigate = useNavigate();

	const [auth, setAuth] = useState(() => {
		localStorage.removeItem('accessToken');

		return {}
	});

	const registerSubmitHandler = async (values) => {
		const result = await authService.register(values.email, values.firstName, values.lastName, values.password);
		setAuth(result);
		localStorage.setItem('accessToken', result.accessToken);
		navigate(Path.Home)
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
	console.log(auth)

	const values = {
		registerSubmitHandler,
		loginSubmitHandler,
		logoutHandler,
		firstName: auth.firstName,
		lastName: auth.lastName,
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