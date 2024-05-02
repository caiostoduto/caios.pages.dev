"use client";

import { Reforma1918Negra } from "@/app/fonts";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLayoutEffect } from "react";
import { useRef } from "react";

export default function TitleBrio() {
	const pro = useRef(null);
	const jeto = useRef(null);
	const brio = useRef(null);
	const sm = useRef(null);

	useLayoutEffect(() => {
		gsap.registerPlugin(CustomEase);

		const customEaseIn = CustomEase.create(
			"custom-ease-in",
			"0.52, 0.00, 0.48, 1.00",
		);

		const timeline = gsap.timeline();

		timeline
			.fromTo(
				pro.current,
				{ x: (pro.current as unknown as HTMLSpanElement).offsetWidth },
				{ x: "0rem", duration: 1.6, ease: customEaseIn },
				0,
			)
			.fromTo(
				jeto.current,
				{ x: -(jeto.current as unknown as HTMLSpanElement).offsetWidth },
				{ x: "0rem", duration: 1.6, ease: customEaseIn },
				0.6,
			)
			.fromTo(
				brio.current,
				{ x: (brio.current as unknown as HTMLSpanElement).offsetWidth },
				{ x: "0rem", duration: 1.6, ease: customEaseIn },
				0.6,
			)
			.fromTo(
				sm.current,
				{
					x: -(
						(sm.current as unknown as HTMLSpanElement)
							.parentElement as HTMLDivElement
					).offsetWidth,
				},
				{ x: "0rem", duration: 1.6, ease: customEaseIn },
				1.3,
			);

		return () => {
			timeline.kill();
		};
	}, []);

	return (
		<div className={`text-[7vw] ${Reforma1918Negra.className} select-none`}>
			<div className="flex">
				<div className="flex overflow-hidden">
					<span ref={pro}>PRO</span>
				</div>
				<div className="flex overflow-hidden">
					<span ref={jeto}>JETO</span>
				</div>

				<span className="w-[2vw]" />

				<div className="flex overflow-hidden">
					<span ref={brio}>BRIO</span>
				</div>

				<div className="flex overflow-hidden">
					<span className="w-[2vw]" />
					<span ref={sm}>(s.m.)</span>
				</div>
			</div>
		</div>
	);
}
