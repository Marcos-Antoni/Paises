import React, { useState } from "react"

// componentes
import Formulario from "../components/index/Formulario"
import Carrusel from "../components/index/Carrusel"
import Loading from "../components/Loading"

export default function Index() {
	// state
	const [infoDepuradaDePaises, setInfoDepuradaDePaises] = useState([])
	const [arrayDeUbicacionDeSwiper, setArrayDeUbicacionDeSwiper] = useState([0])
	const [swiperJS, setSwiperJS] = useState(null)
	const [cantidadDeTargetas, setCantidadDeTargetas] = useState(8)

	return (
		<>
			<Formulario
				arrayDeNumeros={setArrayDeUbicacionDeSwiper}
				informacionDePaises={setInfoDepuradaDePaises}
				numeroDeTargetas={cantidadDeTargetas}
				swiperJS={swiperJS}
			/>

			{!!infoDepuradaDePaises[0] && infoDepuradaDePaises[0].name !== "cargando..." ? (
				<Carrusel
					swiperJS={swiperJS}
					setSwiperJS={setSwiperJS}
					arrayDeUbicacionDeSwiper={arrayDeUbicacionDeSwiper}
					infoDepuradaDePaises={infoDepuradaDePaises}
					cantidadDeTargetas={cantidadDeTargetas}
					setCantidadDeTargetas={setCantidadDeTargetas}
				/>
			) : (
				<Loading texto={"loading..."} />
			)}
		</>
	)
}
