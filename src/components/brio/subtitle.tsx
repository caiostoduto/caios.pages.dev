import { TypeAnimation } from "react-type-animation";

export default function BrioSubtitle() {
	return (
		<TypeAnimation
			sequence={[2300, "Universo sentimental de Caio Stoduto"]}
			wrapper="span"
			cursor={false}
			speed={50}
			className="text-[0.9rem] h-[1.5rem] min-[720px]:text-[1.8rem] min-[720px]:h-[3rem] text-opacity-100 text-[#ddd] font-bold"
		/>
	);
}
