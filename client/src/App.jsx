import {useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";

import {AuthProvider} from "./context/authContext.jsx";

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

	return (

		<AuthProvider>
			<div id='box'>
				<Header/>

				<Routes>
					<Route path={Path.Home} element={<Home/>}/>
					<Route path={Path.Login} element={<Login/>}/>
					<Route path={Path.Register} element={<Register />}/>
					<Route path={Path.AddCertificate} element={<AddCertificate />}/>
					<Route path={Path.MyCertificates} element={<MyCertificates />}/>
					<Route path={`${Path.MyCertificates}/:certificateId`} element={<CertificateDetails />} />
					<Route path={`${Path.EditCertificate}/:certificateId`} element={<EditCertificate />} />
					<Route path={Path.Logout} element={<Logout />} />
				</Routes>

				<Footer/>
			</div>
		</AuthProvider>
	)
}

export default App
