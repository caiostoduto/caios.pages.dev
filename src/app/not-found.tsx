"use client";

import { quantum } from "ldrs";
import { usePathname } from "next/navigation";
import { type ReactElement, type ReactNode, useEffect, useState } from "react";

export default function NotFound(): ReactNode {
	const code = (usePathname() as string)?.slice(1);
	const [redirectURL, setRedirectURL] = useState<string | null>(null);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			const url = await fetchRedirectURL(code);
			setRedirectURL(url);
			setLoading(false);
		})();
	}, [code]);

	if (isLoading) return LoadingScreen();
	if (redirectURL) window.location.replace(redirectURL);
}

function LoadingScreen(): ReactNode {
	quantum.register();

	return (
		<main className="flex flex-col items-center justify-center w-full h-screen">
			<l-quantum size="75" speed="1.75" color="var(--foreground-rgb)" />
		</main>
	);
}

interface FetchRedirectURLResponse {
	url?: string;
}

async function fetchRedirectURL(code: string): Promise<string | null> {
	const url = `/api/redirect?q=${code}`;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		return ((await response.json()) as FetchRedirectURLResponse).url ?? null;
	} catch (e) {
		return null;
	}
}
