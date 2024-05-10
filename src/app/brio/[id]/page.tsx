"use client";

export const runtime = "edge";

import Gradient from "@/components/brio/gradient";

import Intro from "@/app/brio/[id]/intro";

export default function BrioAuthentication() {
	return (
		<div>
			<Gradient />

			<main className="w-full absolute">
				<Intro />
			</main>
		</div>
	);
}
