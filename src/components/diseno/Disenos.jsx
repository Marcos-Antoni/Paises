import styled, { css } from "styled-components"
// animcion
import { Aparecer, MoverLetrar } from "./animciones"

/** 
- Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
- Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
- Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
- Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
- Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
- White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)
**/

// variables
const Background = "hsl(207, 26%, 17%)",
	Color = "hsl(0, 0%, 100%)",
	BackgroundSecundario = "hsl(209, 23%, 22%)",
	marginLeft = css`
		padding: 0 80px;

		@media (max-width: 600px) {
			padding: 0 40px;
		}

		@media (max-width: 400px) {
			padding: 0 20px;
		}
	`,
	QuitarBordePorDefecto = css`
		outline: none;
		border: none;
	`,
	// tamaños
	TamanoDeSelect = css`
		width: 225px;
	`,
	TamanoDeLetraDeSelect = "15px",
	// animaciones
	Trancision = css`
		transition-duration: 0.5s;
	`

//inicio de la aplicacion
export const Titulo = styled.h1`
		margin: 0;
		font-size: 22px;
	`,
	Inicio = styled.div`
		font-family: "Open Sans", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		letter-spacing: 0.2px;

		background-color: ${Background};
		color: ${Color};

		width: 100vw;
		height: auto;

		min-height: 100vh;
		max-width: 100vw;
	`,
	MargenDeRouter = styled.div`
		width: auto;

		${marginLeft};
	`,
	// Header
	DivHeader = styled.div`
		max-width: 99vw;
		height: 60px;
		background-color: ${BackgroundSecundario};
		display: flex;
		align-items: center;
		justify-content: space-between;
		${marginLeft};
	`,
	LinkDeGitHub = styled.a`
		color: #fff;
		font-size: 30px;
	`,
	//targeta de paises
	Targeta = styled.div`
		${Trancision}

		width: 100%;
		height: auto;
		background-color: ${BackgroundSecundario};

		cursor: pointer;

		border-radius: 5px;

		text-decoration: none;
		color: #fff;
	`,
	Bandera = styled.div.attrs(props => ({
		img: props.img || "",
		style: { backgroundImage: `url(${props.img})` },
	}))`
		width: 100%;
		height: 110px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;

		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		margin-top: 0;
	`,
	ContenedorInformacionDelPais = styled.div`
		padding: 10px;
		padding-left: 15px;
		padding-bottom: 30px;
	`,
	NombreDelPais = styled.h2`
		font-size: 18px;
		margin-top: 0;
		margin-bottom: 10px;
	`,
	InfoDelPais = styled.p`
		font-size: 14px;
		margin-bottom: -5px;
	`,
	// contenedor de targetas
	GridDeTargetas = styled.section`
		display: grid;

		${({ columnas }) => {
			return css`
				grid-template-columns: repeat(${columnas}, ${columnas}fr);
			`
		}}
		/* grid-template-columns: repeat(4, 4fr); */
		grid-gap: 20px;
		justify-content: space-between;
		align-items: start;
		padding-bottom: 20px;

		max-width: 100vw;
		width: 100%;

		/* css de animaciones */
		.TargetaDePaises-exit.TargetaDePaises-exit-active,
		.TargetaDePaises-enter {
			transition-duration: 0.5s;
			margin-top: -500px;
			opacity: 0.01;
		}

		.TargetaDePaises-enter.TargetaDePaises-enter-active,
		.TargetaDePaises-exit {
			transition-duration: 0.5s;
			opacity: 1;
			margin-top: 0px;
		}
	`,
	// formulario de busqueda  y navegacion
	FormularioDeBusqueda = styled.form`
		display: flex;
		align-items: center;
		justify-content: space-between;

		height: 70px;

		@media (max-width: 900px) {
			margin: 20px 0;
			flex-direction: column;
			height: 150px;
			justify-content: center;
			align-items: start;
		}
	`,
	ContenedorDeInput = styled.label`
		display: flex;
		align-items: center;

		background-color: ${BackgroundSecundario};
		height: 30%;
		width: 30%;
		padding: 10px;

		border-radius: 5px;

		@media (max-width: 900px) {
			width: calc(100% - 20px);
			height: 25px;
		}
	`,
	InputText = styled.input.attrs(() => ({
		type: "text",
	}))`
		${QuitarBordePorDefecto}
		background-color:${BackgroundSecundario};
		color: #fff;

		width: 90%;
		margin-left: 10px;

		&::placeholder {
			color: #cecece;
		}
	`,
	Icono = styled.i`
		cursor: pointer;
		width: 10%;
		text-align: center;
	`,
	SelectDeContinente = styled(ContenedorDeInput)`
		position: relative;
		justify-content: space-between;

		${TamanoDeSelect};
		cursor: pointer;

		@media (max-width: 900px) {
			width: calc(100% - 20px);
		}
	`,
	ContenedorDeOpcionesDeContinente = styled(ContenedorDeInput)`
		display: block;
		position: absolute;
		z-index: 10;

		${TamanoDeSelect};
		height: 180px;
		padding-top: 0;
		padding-bottom: 0;
		box-shadow: -5px 10px 10px ${Background};

		top: 45px;
		left: 0;

		${props =>
			props.animacion
				? css`
						animation: ${Aparecer("#ffff")} 0.2s linear;
				  `
				: css`
						animation: ${Aparecer("#00000000")} 0.2s linear reverse;
				  `};

		@media (max-width: 900px) {
			width: 97%;
			top: 50px;
		}
	`,
	OpcionDeConteninte = styled.div`
		${Trancision}

		width: auto;
		margin: 10px;
		font-size: ${TamanoDeLetraDeSelect};
		border-bottom: 1px solid #fff00000;

		&:hover {
			font-size: 18px;
			border-bottom: 1px solid #fff;
		}
	`,
	ContenedorDeSwiper = styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 30%;

		i {
			${Trancision}

			font-size: 20px;
			/* margin: 0 -1px; */
			color: rgba(255, 255, 255, 0.356);
			cursor: pointer;

			&:hover {
				color: #fff;
			}
		}

		@media (max-width: 900px) {
			width: 100%;
			height: 50px;

			i {
				margin: 0 1px;
			}
		}
	`,
	SwiperEditado = styled.div`
		width: 80%;

		.swiper-slide {
			${Trancision}
			display: flex;

			justify-content: center;
			align-items: center;

			cursor: pointer;
		}
		.seleccionado {
			font-weight: bold;
			font-size: 18;
		}
	`,
	// paises
	GridContenedorDePais = styled.div`
		display: grid;
		align-content: center;
		justify-content: space-around;
		height: 100%;
		width: 100%;

		margin-top: 20px;

		${({ col, gap }) => {
			return css`
				grid-template-columns: repeat(${col[0]}, ${col[0]}fr);
				grid-column-gap: ${gap[0]};

				@media (max-width: 1000px) {
					grid-column-gap: ${gap[1]};
				}

				@media (max-width: 900px) {
					grid-template-columns: 1fr;
					/* padding-bottom: 20px; */
				}
			`
		}}
	`,
	ItemDeGridPaises = styled.div`
		display: flex;
		align-items: center;
		width: 100%;

		${({ colum }) => {
			return (
				!!colum &&
				css`
					grid-column: ${colum};

					@media (max-width: 900px) {
						grid-column: 1 / 2;
					}
				`
			)
		}}

		@media (max-width: 900px) {
			margin-bottom: 20px;
		}
	`,
	ContenedorDeBotonDeAtras = styled(ItemDeGridPaises)`
		height: 75px;

		@media (max-width: 900px) {
			margin-bottom: 30px;
		}
	`,
	BotonDeAtras = styled.a`
		background-color: ${BackgroundSecundario};
		color: #fff;

		width: auto;
		padding: 10px 30px;
		border-radius: 5px;

		box-shadow: #00000081 0 0 5px;

		${Trancision}

		text-decoration: none;
		font-weight: bold;
		font-size: 16px;

		&:hover {
			box-shadow: #000000 0 0 10px;
		}
	`,
	ImgDeBandera = styled.img`
		width: 100%;

		@media (max-width: 900px) {
			/* margin-bottom: 30px; */
		}
	`,
	NombreDePais = styled(ItemDeGridPaises)`
		height: auto;
	`,
	ContenedorDeInfo = styled(ItemDeGridPaises)`
		display: block;
	`,
	TextoDeInformacion = styled.p`
		width: 100%;
		font-size: 16px;

		span {
			font-weight: bold;
			text-transform: capitalize;
		}

		@media (max-width: 1155px) {
			font-size: 14px;
		}

		@media (max-width: 900px) {
			font-size: 18px;
		}
	`,
	// loading
	CentrarLoaging = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		width: 100%;
		height: 70vh;
	`,
	LetraDeSpan = styled.span`
		display: inline-block;
		position: relative;
		font-size: 50px;
		font-weight: bold;
		text-transform: uppercase;

		margin-left: 10px;

		animation: ${MoverLetrar} 0.75s ease-in-out infinite;

		${({ delay }) =>
			css`
				animation-delay: calc(0.075s * ${delay});
			`}

		@media (max-width: 510px) {
			font-size: 35px;
		}

		@media (max-width: 400px) {
			margin-left: 5px;
			font-size: 30px;
		}
	`,
	ContenedorDeLetra = styled.div`
		position: relative;
		-webkit-box-reflect: below -15px linear-gradient(transparent, hsl(207, 26%, 17%, 50%));
	`
