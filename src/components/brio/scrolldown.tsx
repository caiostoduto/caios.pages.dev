import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

export default function BrioScrollDown() {
	const image = useRef(null);

	useLayoutEffect(() => {
		gsap.registerPlugin(CustomEase);

		const customEaseIn = CustomEase.create(
			"custom-ease-in",
			"0.52, 0.00, 0.48, 1.00",
		);

		gsap.fromTo(
			image.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 4, ease: customEaseIn, delay: 2 },
		);

		return () => {
			gsap.killTweensOf(image.current);
		};
	});

	return (
		<Image
			ref={image}
			className="pt-4 animate-[bounce_1s_ease-in-out_infinite] opacity-0 w-[10.5px] min-[720px]:w-[21px] "
			src="../icons/arrow.svg"
			width={21}
			height={21}
			alt="Ícone seta para baixo"
		/>
	);
}
