import {useState} from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthContext from "./context/authContext.js";


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

function App() {

	const values = {};

	return (
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
				</Routes>
				<Footer/>

			</div>
	)
}

export default App
