import React from "react"
import { Titulo, DivHeader, LinkDeGitHub } from "./diseno/Disenos"

export default function Header() {
	return (
		<DivHeader>
			<Titulo>Where in the world?</Titulo>
			<LinkDeGitHub href="https://github.com/Marcos-Antoni">
				<i className="fab fa-github"></i>
			</LinkDeGitHub>
		</DivHeader>
	)
}
