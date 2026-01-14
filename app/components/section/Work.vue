<template>
    <div ref="mainWrapper" class="bg-black text-neutral-200 overflow-x-hidden">
        <section
            ref="headerSection"
            class="h-[50vh] flex items-end px-6 lg:px-16 pb-12"
        >
            <div class="overflow-hidden">
                <span
                    class="text-xs font-mono tracking-[0.2em] text-neutral-500 block mb-4 reveal-meta opacity-0"
                >
                    02 — SELECTED WORKS
                </span>

                <h2
                    class="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight"
                >
                    <div class="overflow-hidden">
                        <span class="block reveal-text translate-y-full"
                            >Recent</span
                        >
                    </div>
                    <div class="overflow-hidden">
                        <span
                            class="block reveal-text translate-y-full text-neutral-500"
                            >Works/Projects.</span
                        >
                    </div>
                </h2>
            </div>
        </section>

        <section ref="scrollSection" class="relative h-screen overflow-hidden">
            <div
                ref="wrapper"
                class="flex gap-10 px-6 lg:px-16 h-full items-center w-fit will-change-transform"
            >
                <div
                    v-for="(project, index) in projects"
                    :key="project.id"
                    class="project-card relative w-[80vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] shrink-0 group"
                >
                    <div
                        class="absolute -top-12 left-0 text-4xl font-light text-neutral-700 overflow-hidden"
                    >
                        <span
                            class="block translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                            >{{ String(index + 1).padStart(2, "0") }}</span
                        >
                    </div>
                    <div
                        class="relative w-full h-full overflow-hidden rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                    >
                        <img
                            :src="project.image"
                            class="project-image absolute inset-0 w-[120%] h-full object-cover object-center transition-transform duration-700"
                            style="left: -10%"
                        />
                        <div
                            class="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                        ></div>
                    </div>
                    <div
                        class="absolute bottom-8 left-8 z-20 mix-blend-difference pointer-events-none"
                    >
                        <h3
                            class="text-3xl md:text-5xl font-bold text-white mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                        >
                            {{ project.title }}
                        </h3>
                        <p
                            class="text-sm md:text-base text-neutral-300 max-w-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200"
                        >
                            {{ project.description }}
                        </p>
                    </div>
                    <div
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                    >
                        <span
                            class="text-xs font-bold text-white tracking-widest uppercase"
                            >View</span
                        >
                    </div>
                </div>

                <div
                    class="w-[30vw] h-[70vh] flex items-center justify-center shrink-0 border-l border-neutral-800"
                >
                    <a
                        href="https://github.com/adityakurnias"
                        class="text-xl font-mono tracking-widest hover:text-white transition-colors duration-300"
                    >
                        VIEW ALL ARCHIVE &rarr;
                    </a>
                </div>
            </div>
        </section>

        <div class="h-[20vh] w-full bg-black"></div>
    </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import worksData from "~/contents/works.json";

gsap.registerPlugin(ScrollTrigger);

const projects = worksData.projects;
const mainWrapper = ref<HTMLElement | null>(null);
const headerSection = ref<HTMLElement | null>(null);
const scrollSection = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
    if (!mainWrapper.value || !scrollSection.value || !wrapper.value) return;

    ctx = gsap.context(() => {
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: headerSection.value,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        headerTl
            .to(".reveal-meta", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            })
            .to(
                ".reveal-text",
                {
                    y: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power4.out",
                },
                "-=0.8",
            );

        const getScrollAmount = () => {
            let wrapperWidth = wrapper.value!.scrollWidth;
            return -(wrapperWidth - window.innerWidth);
        };

        const tween = gsap.to(wrapper.value, {
            x: () => getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: scrollSection.value,
                start: "top top",
                end: () => `+=${Math.abs(getScrollAmount())}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        const images = gsap.utils.toArray<HTMLElement>(".project-image");
        images.forEach((img) => {
            gsap.to(img, {
                x: "10%",
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest(".project-card"),
                    containerAnimation: tween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                },
            });
        });
    }, mainWrapper.value);
});

onUnmounted(() => {
    if (ctx) ctx.revert();
});
</script>
