import {useState} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Path from "./paths.js";
import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import AddCertificate from "./components/myCerificates/AddCertificate.jsx";
import MyCertificates from "./components/myCerificates/MyCertificates.jsx";
import CertificateDetails from "./components/myCerificates/CertificateDetails.jsx";
import EditCertificate from "./components/myCerificates/EditCertificate.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {

	return (
		<div id='box'>
			<Header/>
			<Routes>
				<Route path={Path.Home} element={<Home/>}/>
				<Route path={Path.Login} element={<Login/>}/>
				<Route path={Path.Register} element={<Register />}/>
				<Route path={Path.AddCertificate} element={<AddCertificate />}/>
				<Route path={Path.MyCertificates} element={<MyCertificates />}/>
				<Route path={Path.CertificateDetail} element={<CertificateDetails />} />
				<Route path={Path.EditCertificate} element={<EditCertificate />} />
			</Routes>
			<Footer></Footer>

		</div>
	)
}

export default App
