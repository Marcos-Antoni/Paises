import { keyframes } from "styled-components"

export const Aparecer = color => keyframes`
    from {
        height: 0;
        color:#00000000;
    }

    99% {
        color:#00000000;
    }

    to {
        height: 180px;
        color:${color}
    }
`,
	MoverLetrar = keyframes`
		0%,40%,100%{
            transform: translateY(0px);
        }

        20%{
            transform: translateY(-30px);
        }
	`
