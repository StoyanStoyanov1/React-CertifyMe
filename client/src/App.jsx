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
import RemoveCertificate from "./components/removeCertificate/RemoveCertificate.jsx";
import AllCertificate from "./components/myCerificates/AllCertificate.jsx";
import AllProfiles from "./components/allProfiles/AllProfiles.jsx";
import DetailProfil from "./components/allProfiles/DetailProfil.jsx";
import EditProfile from "./components/allProfiles/EditProfile.jsx";
import MyProfil from "./components/allProfiles/MyProfil.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {

	return (
		<ErrorBoundary>
			<AuthProvider>
				<div id='box'>
					<Header/>

					<Routes>
						<Route path={Path.Home} element={<Home/>}/>
						<Route path={Path.Login} element={<Login/>}/>
						<Route path={Path.Register} element={<Register/>}/>
						<Route path={Path.AddCertificate} element={<AddCertificate/>}/>
						<Route path={Path.MyCertificates} element={<MyCertificates/>}/>
						<Route path={Path.AllCertificate} element={<AllCertificate/>}/>
						<Route path={`${Path.MyCertificates}/:certificateId`} element={<CertificateDetails/>}/>
						<Route path={`${Path.EditCertificate}/:certificateId`} element={<EditCertificate/>}/>
						<Route path={Path.Logout} element={<Logout/>}/>
						<Route path={`${Path.Remove}/:certificateId`} element={<RemoveCertificate/>}/>
						<Route path={Path.AllProfiles} element={<AllProfiles/>}/>
						<Route path={`${Path.Profil}/:profilId`} element={<DetailProfil/>}/>
						<Route path={`${Path.EditProfile}/:profilId`} element={<EditProfile/>}/>
						<Route path={Path.MyProfil} element={<MyProfil/>}/>
					</Routes>

					<Footer/>
				</div>
			</AuthProvider>
		</ErrorBoundary>
	)
}

export default App
