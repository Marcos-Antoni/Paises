import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

//estilos,stayls components
import "swiper/swiper.scss"

// componentes
import TargetaDePaises from "../TargetaDePaises"

export default function Carrusel({
	setSwiperJS,
	arrayDeUbicacionDeSwiper,
	infoDepuradaDePaises,
	cantidadDeTargetas,
	setCantidadDeTargetas,
}) {
	// useState
	const [refSwiper, setRefSwiper] = useState(null)
	const [numeroDeSlaide, setNumeroDeSlaide] = useState(0)

	// funcion
	const cantidadDeTargetasPermitidas = width => {
		if (width >= 840) {
			setCantidadDeTargetas(8)
		} else if (width >= 600) {
			setCantidadDeTargetas(6)
		} else if (width >= 396) {
			setCantidadDeTargetas(4)
		} else {
			setCantidadDeTargetas(2)
		}
	}

	// useEffect
	useEffect(() => {
		setSwiperJS(refSwiper)
	}, [refSwiper, setSwiperJS])

	return (
		<Swiper
			onResize={e => {
				cantidadDeTargetasPermitidas(e.width)
			}}
			spaceBetween={35}
			slidesPerView={1}
			onSlideChange={swiper => {
				setRefSwiper(null)
				setRefSwiper(swiper)
				setNumeroDeSlaide(swiper.activeIndex)
			}}
			onSwiper={swiper => {
				setRefSwiper(swiper)
				setNumeroDeSlaide(swiper.activeIndex)

				cantidadDeTargetasPermitidas(swiper.width)
			}}>
			{arrayDeUbicacionDeSwiper.map(numero => (
				<SwiperSlide key={numero}>
					<TargetaDePaises
						activarAnimacion={
							numero >= numeroDeSlaide - 1 && numero <= numeroDeSlaide + 1
						}
						arrayDePaises={infoDepuradaDePaises}
						inicio={numero * cantidadDeTargetas}
						fin={(numero + 1) * cantidadDeTargetas - 1}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
