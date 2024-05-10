import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useRef } from "react";

import ScrollDown from "@/components/brio/scrolldown";
import Subtitle from "@/components/brio/subtitle";
import Title from "@/components/brio/title";

export default function BrioIntro() {
	const intro = useRef(null);

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.to(intro.current, {
			scrollTrigger: {
				trigger: intro.current,
				toggleActions: "play none none none",
				// markers: true,
				scrub: 1,
				start: `bottom ${
					(intro.current as unknown as HTMLDivElement).offsetHeight
				}`,
				end: `bottom ${
					(intro.current as unknown as HTMLDivElement).offsetHeight / 2
				}`,
			},
			opacity: 0,
		});

		gsap.to((intro.current as unknown as HTMLDivElement).childNodes[0], {
			scrollTrigger: {
				trigger: intro.current,
				toggleActions: "play none none none",
				// markers: true,
				scrub: 1,
				start: `bottom ${
					(intro.current as unknown as HTMLDivElement).offsetHeight
				}`,
				end: `bottom ${
					(intro.current as unknown as HTMLDivElement).offsetHeight / 2
				}`,
			},
			paddingBottom: 25,
		});

		gsap.to((intro.current as unknown as HTMLDivElement).childNodes[1], {
			scrollTrigger: {
				trigger: intro.current,
				toggleActions: "play none none none",
				// markers: true,
				scrub: 1,
				start: `bottom ${
					(intro.current as unknown as HTMLDivElement).offsetHeight
				}`,
				end: `bottom ${
					(intro.current as unknown as HTMLDivElement).offsetHeight / 2
				}`,
			},
			paddingBottom: 50,
		});
	}, []);

	return (
		<div className="h-screen">
			<div
				className="flex flex-col items-center justify-center h-svh"
				ref={intro}
			>
				<Title />
				<Subtitle />
				<ScrollDown />
			</div>
		</div>
	);
}
