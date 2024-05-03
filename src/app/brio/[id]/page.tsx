"use client";

export const runtime = "edge";

import Gradient from "@/components/gradient";
import Title from "@/components/title-brio";

export default function BrioAuthentication() {
	return (
		<div>
			<Gradient />

			<div className="h-screen">
				<div className="flex flex-col items-center justify-center h-svh">
					<Title />
				</div>
			</div>
		</div>
	);
}
