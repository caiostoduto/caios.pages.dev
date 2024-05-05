import styles from "@/components/brio/styles/gradient.module.css";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLayoutEffect, useRef } from "react";

export default function BrioGradient() {
	const gradient = useRef(null);

	useLayoutEffect(() => {
		gsap.registerPlugin(CustomEase);

		const customEaseIn = CustomEase.create(
			"custom-ease-in",
			"0.52, 0.00, 0.48, 1.00",
		);

		gsap.fromTo(
			gradient.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 4, ease: customEaseIn },
		);
	});

	return (
		<div className="fixed flex flex-col items-center justify-center h-svh w-full">
			<div ref={gradient} className={`${styles.gradient} opacity-0`} />
		</div>
	);
}
