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
import Logout from "./components/logout/Logout.jsx";
import RemoveCertificate from "./components/removeCertificate/RemoveCertificate.jsx";
import AllCertificate from "./components/myCerificates/AllCertificate.jsx";
import AllProfiles from "./components/allProfiles/AllProfiles.jsx";
import DetailProfil from "./components/allProfiles/DetailProfil.jsx";
import EditProfile from "./components/allProfiles/EditProfile.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import AuthGuard from "./components/guards/AuthGuard.jsx";
import CreateNewChat from "./components/messages/Chat.jsx"
import Chat from "./components/messages/Chat.jsx";
import FindChat from "./components/messages/FindChat.jsx";
import ChatBox from "./components/messages/ChatBox.jsx";

function App() {
	return (
		<ErrorBoundary>
			<AuthProvider>
				<div id='box'>
					<Header/>

					<Routes>
						{/* Public routes */}
						<Route path={Path.Home} element={<Home/>}/>
						<Route path={Path.Login} element={<Login/>}/>
						<Route path={Path.Register} element={<Register/>}/>
						<Route path={`${Path.MyCertificates}/:userId`} element={<MyCertificates/>}/>
						<Route path={Path.AllCertificate} element={<AllCertificate/>}/>
						<Route path={Path.AllProfiles} element={<AllProfiles/>}/>
						<Route path={`${Path.Profil}/:profilId`} element={<DetailProfil/>}/>
						<Route path={`${Path.MyCertificates}/:certificateId/details`} element={<CertificateDetails/>}/>

						{/* Routes protected by AuthGuard */}
						<Route element={<AuthGuard />}>
							<Route path={`${Path.MyProfil}/:profilId`} element={<DetailProfil/>}/>
							<Route path={`${Path.EditProfile}/:profilId`} element={<EditProfile/>}/>
							<Route path={`${Path.Remove}/:certificateId`} element={<RemoveCertificate/>}/>
							<Route path={`${Path.EditCertificate}/:certificateId`} element={<EditCertificate/>}/>
							<Route path={Path.AddCertificate} element={<AddCertificate/>}/>
							<Route path={Path.Logout} element={<Logout/>}/>
							<Route path={`${Path.Chat}/:chatId`} element={<Chat/>}/>
							<Route path={`${Path.Chat}/find-chat/:receiver`} element={<FindChat/>}/>
							<Route path={`${Path.ChatBox}/:userId`} element={<ChatBox/>}/>
						</Route>
					</Routes>
				</div>
			</AuthProvider>
		</ErrorBoundary>
	)
}

export default App
