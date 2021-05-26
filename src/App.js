import React from "react"
import Router from "./components/Router"
import { Inicio, MargenDeRouter } from "./components/diseno/Disenos"
import Header from "./components/Header"

function App() {
	return (
		<Inicio>
			<Header />
			<MargenDeRouter>
				<Router />
			</MargenDeRouter>
		</Inicio>
	)
}

export default App
