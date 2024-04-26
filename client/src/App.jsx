import {useState} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Path from "./paths.js";
import Home from "./components/home/Home.jsx";

function App() {

	return (
		<div id='box'>
			<Header/>
			<Routes>
				<Route path={Path.Home} element={<Home/>}/>

			</Routes>

		</div>
	)
}

export default App
