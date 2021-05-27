import React from "react"
import { useParams, Link } from "react-router-dom"

//hooks
import usePedirPaise from "../hooks/usePedirPaise"

// estilos
import {
	GridContenedorDePais,
	ContenedorDeBotonDeAtras,
	BotonDeAtras,
	ItemDeGridPaises,
	ImgDeBandera,
	NombreDePais,
	TextoDeInformacion,
	ContenedorDeInfo,
} from "../components/diseno/Disenos"
import Loading from "../components/Loading"

export default function Pais() {
	// constantes
	const { pais } = useParams()
	const info = usePedirPaise({ nombreCompleto: pais })

	const arrayInfo1 = [
		{ name: "Native Name", infoName: info[0].nativeName },
		{ name: "Population", infoName: info[0].population },
		{ name: "Region", infoName: info[0].region },
		{ name: "sub region", infoName: info[0].subregion },
		{ name: "capital", infoName: info[0].capital },
	]

	const arrayInfo2 = [
		{
			name: "top Level Domain",
			infoName: info[0].topLevelDomain && info[0].topLevelDomain[0],
		},
		{
			name: "currencies",
			infoName: info[0].currencies && info[0].currencies[0].name,
		},
		{
			name: "languages",
			infoName: info[0].languages && info[0].languages.map(e => e.name),
		},
	]

	return (
		<GridContenedorDePais col={[2]} gap={["50px", "35px"]}>
			<ContenedorDeBotonDeAtras colum={"1 / 3"}>
				<BotonDeAtras as={Link} to={"/"}>
					<i className="fas fa-arrow-left"></i> Back
				</BotonDeAtras>
			</ContenedorDeBotonDeAtras>

			{!!info[0] && info[0].name !== "cargando..." ? (
				<>
					<ItemDeGridPaises>
						<ImgDeBandera src={info[0].flag} />
					</ItemDeGridPaises>

					<ItemDeGridPaises>
						<GridContenedorDePais col={[2]} gap={["60px", "10px"]}>
							<NombreDePais colum={"1 / 3"}>
								<h1>{info[0].name}</h1>
							</NombreDePais>
							<ContenedorDeInfo>
								{arrayInfo1.map((data, i) => {
									return (
										<TextoDeInformacion key={i}>
											<span>{data.name}: </span> {data.infoName}
										</TextoDeInformacion>
									)
								})}
							</ContenedorDeInfo>
							<ContenedorDeInfo>
								{arrayInfo2.map((data, i) => {
									return (
										<TextoDeInformacion key={i}>
											<span>{data.name}: </span> {data.infoName}
										</TextoDeInformacion>
									)
								})}
							</ContenedorDeInfo>
						</GridContenedorDePais>
					</ItemDeGridPaises>
				</>
			) : (
				<ItemDeGridPaises colum={"1 / 3"}>
					<Loading texto={"loading..."} />
				</ItemDeGridPaises>
			)}
		</GridContenedorDePais>
	)
}
