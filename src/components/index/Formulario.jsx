import React, { useState, useEffect, useReducer, useCallback } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// componentes y hooks
import usePedirPaise from "../../hooks/usePedirPaise"

//estilos
import "swiper/swiper.scss"

// styled-components
import {
	ContenedorDeInput,
	FormularioDeBusqueda,
	Icono,
	InputText,
	SelectDeContinente,
	ContenedorDeOpcionesDeContinente,
	OpcionDeConteninte,
	SwiperEditado,
	ContenedorDeSwiper,
} from "../diseno/Disenos"

export default function Formulario({
	arrayDeNumeros,
	informacionDePaises,
	numeroDeTargetas,
	swiperJS,
}) {
	// state,hooks
	const [nombre, setNombre] = useState(
		!!localStorage.getItem("nombre") ? localStorage.getItem("nombre") : ""
	)
	const [regionSeleccionada, setRegionSeleccionada] = useState(
		!!localStorage.getItem("region") ? localStorage.getItem("region") : ""
	)
	const [arrayDeUbicacionDeSwiper, setArrayDeUbicacionDeSwiper] = useState([0])
	const [activarSelect, setActivarSelect] = useState(false)
	const [ancimacionDeAparicionSelect, setAncimacionDeAparicionSelect] = useState(true)
	const [infoDeSwiper, setInfoDeSwiper] = useState(null)
	const [numDeSlaiderDePaises, setNumDeSlaiderDePaises] = useState(0)

	const infoSinLimpiarDePaises = usePedirPaise({ nombre: nombre })

	// costantes
	const regiones = ["Africa", "Americas", "Asia", "Europe", "Oceania", "all"]
	const DetectarUnaRegionSeleccionada =
		regionSeleccionada !== "" && regionSeleccionada !== "all"

	// funciones, useCallback
	const separarPorContinente = () => {
		let paisesDepurados = infoSinLimpiarDePaises.filter(pais => {
			if (DetectarUnaRegionSeleccionada) {
				return pais.region === regionSeleccionada
			} else {
				return pais
			}
		})

		if (!!paisesDepurados[0]) {
			localStorage.setItem("paisesDepurados", JSON.stringify(paisesDepurados))
		} else {
			paisesDepurados = [{ name: "error" }]
		}

		return paisesDepurados
	}

	const textoLimpio = e => {
		let value = e.target.value
		if (value[0] === " ") value = value[0].replace(" ", "")
		setNombre(value)
	}

	const escogerContinente = continente => {
		setRegionSeleccionada(continente)
	}

	const AparecerYDesaparecerSelect = () => {
		if (activarSelect) {
			setTimeout(() => {
				setActivarSelect(!activarSelect)
				setAncimacionDeAparicionSelect(true)
			}, 190)
			setAncimacionDeAparicionSelect(false)
		} else {
			setActivarSelect(!activarSelect)
		}
	}

	const moverSwiperDeNumeros = numDeSlaider => {
		infoDeSwiper.slideTo(numDeSlaider, 500)
	}

	const moverSwiperDePaises = numDeSlaider => {
		swiperJS.slideTo(numDeSlaider, 500)
		moverSwiperDeNumeros(numDeSlaider - 2)
		setNumDeSlaiderDePaises(numDeSlaider)
	}

	// eslint-disable-next-line
	const callbackMoverSwiperDePaises = useCallback(numDeSlaider => {
		moverSwiperDePaises(numDeSlaider)
	})

	// reduser

	/* esta es la variable que contiene los paises de con todos los parametros que
	el usuario ponga en la pagina */
	const [infoDepuradaDePaises, setInfoDepuradaDePaises] = useReducer(
		separarPorContinente,
		infoSinLimpiarDePaises
	)

	// useEffect
	useEffect(() => {
		setInfoDepuradaDePaises()
		localStorage.setItem("region", regionSeleccionada)
	}, [infoSinLimpiarDePaises, regionSeleccionada])

	useEffect(() => {
		let numeroDeSlaids = infoDepuradaDePaises.length / numeroDeTargetas
		numeroDeSlaids =
			numeroDeSlaids > parseInt(numeroDeSlaids)
				? parseInt(numeroDeSlaids) + 1
				: parseInt(numeroDeSlaids)
		let arrayDeSlaids = []

		for (let i = 0; i < numeroDeSlaids; i++) {
			arrayDeSlaids[i] = i
		}

		setArrayDeUbicacionDeSwiper(arrayDeSlaids)
	}, [numeroDeTargetas, infoDepuradaDePaises])

	useEffect(() => {
		arrayDeNumeros(arrayDeUbicacionDeSwiper)
		informacionDePaises(infoDepuradaDePaises)
	}, [
		arrayDeUbicacionDeSwiper,
		infoDepuradaDePaises,
		arrayDeNumeros,
		informacionDePaises,
	])

	useEffect(() => {
		if (swiperJS) {
			callbackMoverSwiperDePaises(swiperJS.activeIndex)
		}
	}, [swiperJS, callbackMoverSwiperDePaises])

	return (
		<FormularioDeBusqueda>
			<ContenedorDeInput htmlFor="InputNombre">
				<Icono className="fas fa-search"></Icono>

				<InputText
					id="InputNombre"
					onChange={e => {
						textoLimpio(e)
					}}
					value={nombre}
					placeholder="Search for a country..."
				/>
			</ContenedorDeInput>

			<ContenedorDeSwiper>
				<i
					className="fas fa-angle-left"
					onClick={() => {
						moverSwiperDeNumeros(infoDeSwiper.activeIndex - 5)
					}}></i>
				<SwiperEditado
					as={Swiper}
					onSwiper={swiper => setInfoDeSwiper(swiper)}
					spaceBetween={35}
					slidesPerView={
						arrayDeUbicacionDeSwiper.length > 5 ? 5 : arrayDeUbicacionDeSwiper.length
					}>
					{arrayDeUbicacionDeSwiper.map(numero => (
						<SwiperSlide
							className={numDeSlaiderDePaises === numero && "seleccionado"}
							onClick={() => moverSwiperDePaises(numero)}
							key={numero}>
							{numero + 1}
						</SwiperSlide>
					))}
				</SwiperEditado>
				<i
					className="fas fa-angle-right"
					onClick={() => {
						moverSwiperDeNumeros(infoDeSwiper.activeIndex + 5)
					}}></i>
			</ContenedorDeSwiper>

			<SelectDeContinente
				as="div"
				onClick={() => {
					AparecerYDesaparecerSelect()
				}}>
				<p>
					Filter by Region {DetectarUnaRegionSeleccionada && `of ${regionSeleccionada}`}
				</p>
				<i className="fas fa-angle-down"></i>
				{activarSelect && (
					<ContenedorDeOpcionesDeContinente
						as="div"
						animacion={ancimacionDeAparicionSelect}>
						{regiones.map(region => (
							<OpcionDeConteninte
								onClick={() => {
									escogerContinente(region)
								}}
								key={region}>
								{region}
							</OpcionDeConteninte>
						))}
					</ContenedorDeOpcionesDeContinente>
				)}
			</SelectDeContinente>
		</FormularioDeBusqueda>
	)
}
