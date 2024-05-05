"use client";

export const runtime = "edge";

import Gradient from "@/components/gradient";
import Title from "@/components/title-brio";
import { TypeAnimation } from "react-type-animation";

export default function BrioAuthentication() {
	return (
		<div>
			<Gradient />

			<main className="h-full w-full absolute">
				<div className="h-screen">
					<div className="flex flex-col items-center justify-center h-svh">
						<Title />

						<Subtitle />
					</div>
				</div>
			</main>
		</div>
	);
}

function Subtitle() {
	return (
		<TypeAnimation
			sequence={[2300, "Universo sentimental de Caio Stoduto"]}
			wrapper="span"
			cursor={false}
			speed={50}
			className="text-[0.9rem] h-[1.5rem] min-[720px]:text-[1.8rem] min-[720px]:h-[3rem] text-opacity-100 text-[#ccc] font-bold"
		/>
	);
}
