import React, { useState, useEffect } from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Link } from "react-router-dom"

import {
	// TargetaDePaises
	Bandera,
	ContenedorInformacionDelPais,
	NombreDelPais,
	Targeta,
	InfoDelPais,

	// ContenedorDeTargetas
	GridDeTargetas,
} from "./diseno/Disenos"

const paisesPorDefecto = [
	{
		name: "error",
		compressedName: "error",
		flag: null,
		population: null,
		region: null,
		capital: null,
	},
]

function TargetaDePaises({ pais, activarAnimacion }) {
	return (
		<Targeta as={Link} to={`/${pais.name}`}>
			<Bandera loading="lazy" img={activarAnimacion && pais.flag} alt={pais.name} />
			<ContenedorInformacionDelPais>
				<NombreDelPais title={pais.name}>{pais.compressedName}</NombreDelPais>
				<InfoDelPais>
					<b>Population: </b>
					{pais.population}
				</InfoDelPais>
				<InfoDelPais>
					<b>Region: </b>
					{pais.region} {pais.clase}
				</InfoDelPais>
				<InfoDelPais>
					<b>Capital: </b>
					{pais.capital}
				</InfoDelPais>
			</ContenedorInformacionDelPais>
		</Targeta>
	)
}

export default function ContenedorDeTargetas({
	arrayDePaises,
	inicio,
	fin,
	activarAnimacion,
}) {
	// state
	const [arrayDePaisesResumido, setArrayDePaisesResumido] = useState([
		{ name: "cargando..." },
	])
	// funciones
	const minimoDeLetras = pais => {
		if (pais.name.length > 18) {
			pais.compressedName = []

			for (let i = 0; i < 16; i++) {
				pais.compressedName[i] = pais.name[i]
			}

			pais.compressedName = `${pais.compressedName.join("")}...`
		} else {
			pais.compressedName = pais.name
		}

		return pais
	}

	// useEffect
	useEffect(() => {
		let PaisesFlitrados = arrayDePaises.filter((pais, length) => {
			return length >= inicio && length <= fin && pais
		})

		PaisesFlitrados.map(pais => {
			return minimoDeLetras(pais)
		})

		if (PaisesFlitrados.length > 0) {
			setArrayDePaisesResumido(PaisesFlitrados)
		}
	}, [arrayDePaises, inicio, fin])

	return (
		<GridDeTargetas columnas={(fin - inicio + 1) / 2} as={TransitionGroup}>
			{arrayDePaisesResumido[0].name !== "cargando..." &&
				arrayDePaisesResumido.map((pais, i) => {
					return (
						<CSSTransition
							classNames={activarAnimacion && "TargetaDePaises"}
							timeout={{ enter: 500, exit: 500 }}
							key={`${pais.name} ${i}`}>
							<TargetaDePaises pais={pais} activarAnimacion={activarAnimacion} />
						</CSSTransition>
					)
				})}
		</GridDeTargetas>
	)
}

ContenedorDeTargetas.defaultProps = {
	arrayDePaises: paisesPorDefecto,
	inicio: 0,
	fin: 0,
}
