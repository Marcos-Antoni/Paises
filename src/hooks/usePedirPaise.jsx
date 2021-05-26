import { useState, useEffect } from "react"

export default function usePedirPaise({ nombreCompleto, nombre }) {
	// state
	const [paises, setPaises] = useState([{ name: "cargando..." }])
	const [verificarPrimeraPeticion, setVerificarPrimeraPeticion] = useState(false)

	// constantes
	const url = "https://restcountries.eu/rest/v2/"

	// funciones
	const TraerPaises = async () => {
		let pedirPaises

		if (!!nombreCompleto && !nombre) {
			pedirPaises = await fetch(`${url}name/${nombreCompleto}?fullText=true`)
			pedirPaises = await pedirPaises.json()
			pedirPaises = detectorDeErroresDePeticion(pedirPaises, false)
		} else {
			pedirPaises = await buscarPais()
		}
		setPaises(pedirPaises)
	}

	const buscarPais = async () => {
		let pedirPaises

		if (!!verificarPrimeraPeticion || !localStorage.getItem("paises")) {
			pedirPaises = !!nombre
				? await fetch(`${url}name/${nombre}`)
				: await fetch(`${url}all/`)

			pedirPaises = await pedirPaises.json()

			pedirPaises = detectorDeErroresDePeticion(pedirPaises, true)
		} else {
			pedirPaises = JSON.parse(localStorage.getItem("paises"))
		}

		setVerificarPrimeraPeticion(true)
		return pedirPaises
	}

	const detectorDeErroresDePeticion = (verificar, guardarEnStorage) => {
		let respuestaDepurada = []
		if (!!verificar.message) {
			respuestaDepurada[0] = { name: "error" }
			guardarEnStorage && guardarLocaStorage(false, "")
		} else {
			respuestaDepurada = verificar
			guardarEnStorage && guardarLocaStorage(respuestaDepurada, nombre)
		}

		return respuestaDepurada
	}

	const guardarLocaStorage = (paises, nombre) => {
		if (paises) {
			localStorage.setItem("paises", JSON.stringify(paises))
		} else {
			localStorage.removeItem("paises")
		}

		localStorage.setItem("nombre", nombre)
	}

	// useEffect
	useEffect(() => {
		TraerPaises()

		// eslint-disable-next-line
	}, [nombre])

	return paises
}
