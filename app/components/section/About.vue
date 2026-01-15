<template>
    <div
        class="relative w-full text-neutral-200 selection:bg-white selection:text-black"
    >
        <div
            ref="mainContainer"
            class="relative min-h-screen flex flex-col justify-center py-20"
        >
            <div
                class="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-8 items-center relative"
            >
                <div class="lg:col-span-7 z-20 relative mix-blend-difference">
                    <div
                        class="text-xs font-mono mb-6 tracking-[0.2em] text-neutral-400 reveal-meta"
                    >
                        01 — INTRODUCTION
                    </div>

                    <h2
                        class="title text-[11vw] lg:text-[9rem] font-bold leading-[0.85] tracking-tighter"
                    >
                        <span class="block">
                            <span
                                v-for="(char, i) in 'Who'"
                                :key="i"
                                class="reveal-char inline-block"
                            >
                                {{ char }}
                            </span>
                        </span>
                        <span class="block ml-[10%] lg:ml-[15%]">
                            <span
                                v-for="(char, i) in 'I Am'"
                                :key="i"
                                class="reveal-char inline-block"
                            >
                                {{ char === " " ? "\u00A0" : char }}
                            </span>
                        </span>
                    </h2>

                    <div class="mt-16 lg:max-w-md ml-auto lg:mr-10">
                        <p
                            class="reveal-content font-light text-base leading-relaxed text-neutral-300/90"
                        >
                            I’m a Front-End Developer who likes to learn by
                            building and figuring things out as I go. I enjoy
                            working with people, chatting through ideas, and
                            slowly shaping simple thoughts into real, working
                            websites.
                        </p>

                        <div class="more-btn opacity-0 mt-8">
                            <NuxtLink
                                to="/about"
                                class="group inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase hover:text-white transition-colors"
                            >
                                <div
                                    class="relative overflow-hidden w-12 h-px bg-neutral-600 group-hover:bg-white transition-colors duration-300"
                                >
                                    <span
                                        class="absolute top-0 left-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                                    ></span>
                                </div>
                                Discover More
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <div
                    class="lg:col-span-5 h-[50vh] lg:h-[80vh] w-full relative z-10 lg:-ml-20"
                >
                    <div
                        class="image-mask w-full h-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                    >
                        <img
                            ref="profileImage"
                            src="/Images/Self.jpg"
                            alt="Portrait"
                            class="w-full h-[120%] object-cover object-center will-change-transform"
                        />
                    </div>
                    <span
                        class="absolute -bottom-8 right-0 font-mono text-xs text-neutral-500 reveal-meta"
                    >
                        Aditya Kurnia Saputra
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const mainContainer = ref<HTMLElement | null>(null);
const profileImage = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
    if (!mainContainer.value) return;

    ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.value,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
            },
        });

        gsap.set(".image-mask", {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            filter: "blur(10px)",
        });
        gsap.set(".reveal-char", {
            y: 80,
            filter: "blur(10px)",
            opacity: 0,
        });

        const contentTl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.value,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        });

        contentTl
            .to(".image-mask", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.5,
                ease: "power4.inOut",
                filter: "blur(0px)",
            })
            .to(
                ".reveal-char",
                {
                    y: 0,
                    stagger: 0.05,
                    duration: 1,
                    ease: "power3.out",
                    opacity: 1,
                    filter: "blur(0px)",
                },
                "-=1.0",
            )
            .from(
                ".reveal-meta",
                {
                    opacity: 0,
                    duration: 1,
                },
                "-=0.5",
            );

        tl.to(
            profileImage.value,
            {
                y: "-10%",
                ease: "none",
            },
            0,
        );

        const split = new SplitText(".reveal-content", { type: "lines" });
        const masks: HTMLElement[] = [];

        split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);

            gsap.set(line, { y: 100 });
        });

        tl.to(
            split.lines,
            {
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out",
            },
            0,
        );

        tl.to(
            ".more-btn",
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
            },
            0.5,
        );

        tl.to(
            [".title", ".image-mask"],
            {
                filter: "grayscale(0.5)",
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
            },
            ">-0.2",
        );
    }, mainContainer.value);
});

onUnmounted(() => {
    if (ctx) ctx.revert();
});
</script>

<style scoped>
.title {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
}
</style>
