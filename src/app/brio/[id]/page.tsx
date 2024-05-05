"use client";

export const runtime = "edge";

import Gradient from "@/components/brio/gradient";
import ScrollDown from "@/components/brio/scrolldown";
import Subtitle from "@/components/brio/subtitle";
import Title from "@/components/brio/title";

export default function BrioAuthentication() {
	return (
		<div>
			<Gradient />

			<main className="h-full w-full absolute">
				<Intro />
			</main>
		</div>
	);
}

function Intro() {
	return (
		<div className="h-screen">
			<div className="flex flex-col items-center justify-center h-svh">
				<Title />
				<Subtitle />
				<ScrollDown />
			</div>
		</div>
	);
}
