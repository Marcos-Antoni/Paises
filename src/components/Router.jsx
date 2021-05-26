import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

// path
import Index from "../path/Index"
import Pais from "../path/Pais"

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" children={<Index />} />
				<Route exact path="/:pais" children={<Pais />} />
			</Switch>
		</BrowserRouter>
	)
}
