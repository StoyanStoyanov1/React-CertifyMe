import {useState} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";

import AuthContext from "./context/authContext.js";
import * as authService from "./services/authService.js";


import Header from "./components/header/Header.jsx";
import Path from "./paths.js";
import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import AddCertificate from "./components/addCertificate/AddCertificate.jsx";
import MyCertificates from "./components/myCerificates/MyCertificates.jsx";
import CertificateDetails from "./components/certificateDetails/CertificateDetails.jsx";
import EditCertificate from "./components/editCertificate/EditCertificate.jsx";
import Footer from "./components/footer/Footer.jsx";
import Logout from "./components/logout/Logout.jsx";

function App() {
	const navigate = useNavigate();

	const [auth, setAuth] = useState(() => {
		localStorage.removeItem('accessToken');

		return {}
	});

	const registerSubmitHandler = async (values) => {
		const result = await authService.register(values.email, values.password, values.firstName, values.lastName);
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

	const values = {
		registerSubmitHandler,
		loginSubmitHandler,
		logoutHandler,
		username: auth.FirstName || auth.email,
		email: auth.email,
		isAuthenticated: !!auth.email,
	};

	return (
		<AuthContext.Provider value={values}>
			<div id='box'>
				<Header/>

				<Routes>
					<Route path={Path.Home} element={<Home/>}/>
					<Route path={Path.Login} element={<Login/>}/>
					<Route path={Path.Register} element={<Register />}/>
					<Route path={Path.AddCertificate} element={<AddCertificate />}/>
					<Route path={Path.MyCertificates} element={<MyCertificates />}/>
					<Route path={`${Path.MyCertificates}/:certificateId`} element={<CertificateDetails />} />
					<Route path={Path.EditCertificate} element={<EditCertificate />} />
					<Route path={Path.Logout} element={<Logout />} />
				</Routes>

				<Footer/>
			</div>
		</AuthContext.Provider>
	)
}

export default App
