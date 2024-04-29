"use client";

import LoadingAnimation from "@/components/loading";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import styles from "@/app/not-found.module.css";

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

function LoadingScreen() {
	return (
		<div className={styles._}>
			<head>
				<title>Caio Stoduto - URL Shortner</title>
				<meta name="description" content="Você está sendo redirecionado..." />

				<meta property="og:title" content="Caio Stoduto - URL Shortner" />
				<meta
					property="og:description"
					content="Encurtador de links criado pelo Caio Stoduto"
				/>
				{/* <meta property="og:image" content="image_url_here" /> */}
			</head>

			<LoadingAnimation />
		</div>
	);
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

interface FetchRedirectURLResponse {
	url?: string;
}
