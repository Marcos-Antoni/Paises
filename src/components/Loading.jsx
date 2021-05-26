import React from "react"

// diseños
import { CentrarLoaging, LetraDeSpan, ContenedorDeLetra } from "./diseno/Disenos"

export default function Loading({ texto }) {
	// constantes
	const ArrayDeTexto = [...texto]

	return (
		<CentrarLoaging>
			<ContenedorDeLetra>
				{ArrayDeTexto.map((letra, i) => (
					<LetraDeSpan key={i} delay={i}>
						{letra}
					</LetraDeSpan>
				))}
			</ContenedorDeLetra>
		</CentrarLoaging>
	)
}
