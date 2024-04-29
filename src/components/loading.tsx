import { useEffect } from "react";

export default function LoadingAnimation() {
	useEffect(() => {
		async function getLoader() {
			const { quantum } = await import("ldrs");
			quantum.register();
		}

		getLoader();
	}, []);

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<l-quantum size="75" speed="1.75" color="var(--foreground-rgb)" />
		</main>
	);
}
