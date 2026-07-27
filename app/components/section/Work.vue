<template>
    <div ref="mainWrapper" class="bg-black text-neutral-200 overflow-x-hidden">
        <section ref="headerSection"
            class="h-[45vh] md:h-[50vh] flex items-end px-5 sm:px-6 md:px-10 lg:px-16 pb-8 md:pb-12">
            <div class="overflow-hidden max-w-full">
                <span
                    class="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-neutral-500 block mb-3 md:mb-4 reveal-meta opacity-0">
                    02 — SELECTED WORKS
                </span>

                <h2
                    class="font-syncopate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-tight uppercase">
                    <span class="overflow-hidden block">
                        <span class="block reveal-text translate-y-full">Recent</span>
                    </span>
                    <span class="overflow-hidden block">
                        <span class="block reveal-text translate-y-full text-neutral-500">Works/Projects.</span>
                    </span>
                </h2>
            </div>
        </section>

        <section ref="scrollSection" class="relative h-auto lg:h-screen overflow-hidden">
            <div ref="wrapper" <div
                class="flex flex-col md:flex-row gap-6 sm:gap-10 px-5 sm:px-6 md:px-10 lg:px-16 h-full items-stretch md:items-center w-full md:w-fit will-change-transform pb-16 md:pb-0">

                <div v-for="(project, index) in projects" :key="project.id"
                    class="project-card relative w-full md:w-[70vw] lg:w-[45vw] max-w-3xl h-auto md:h-[60vh] lg:h-[70vh] shrink-0 group rounded-2xl overflow-hidden bg-neutral-950 border border-white/5">

                    <div class="absolute top-3 left-3 md:hidden z-30 pointer-events-none">
                        <span
                            class="text-xs font-mono px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-neutral-300">
                            {{ String(index + 1).padStart(2, "0") }}
                        </span>
                    </div>
                    <div
                        class="absolute -top-4 lg:-top-12 left-0 text-4xl font-light text-neutral-700 overflow-hidden z-30 pointer-events-none hidden md:block">
                        <span
                            class="block translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            {{ String(index + 1).padStart(2, "0") }}
                        </span>
                    </div>

                    <div
                        class="relative w-full h-[32vh] sm:h-[40vh] md:h-full overflow-hidden md:rounded-lg md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-out">
                        <img :src="project.image"
                            class="project-image absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 md:w-[120%]"
                            loading="lazy" />
                        <div
                            class="absolute inset-0 bg-linear-to-t from-black via-black/55 to-transparent opacity-90 md:opacity-60 md:group-hover:opacity-100 transition-opacity duration-500">
                        </div>
                    </div>

                    <div
                        class="px-4 sm:px-5 md:px-0 md:absolute md:bottom-5 lg:bottom-8 md:left-5 md:sm:left-6 md:lg:left-8 md:right-5 md:sm:right-6 md:z-20 md:pointer-events-none">
                        <div class="py-4 md:py-0">
                            <h3 class="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold text-white mb-2
                                           translate-y-0 opacity-100
                                           md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100
                                           transition-all duration-500 delay-100">
                                {{ project.title }}
                            </h3>
                            <p class="text-xs sm:text-sm lg:text-base text-neutral-300 max-w-sm
                                          translate-y-0 opacity-100
                                          md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100
                                          transition-all duration-500 delay-200 line-clamp-none md:line-clamp-none">
                                {{ project.description }}
                            </p>
                        </div>
                    </div>

                    <div
                        class="absolute top-4 right-4 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                                    w-10 h-10 sm:w-12 sm:h-12 md:w-24 md:h-24 bg-white/20 md:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center
                                    scale-100 md:scale-0 md:group-hover:scale-100 transition-transform duration-500 ease-out z-30">
                        <a :href="project.url" target="_blank" rel="noopener"
                            class="text-[10px] md:text-xs font-bold text-white tracking-widest uppercase w-full h-full flex items-center justify-center rounded-full">
                            <span class="md:hidden">↗</span>
                            <span class="hidden md:block">View</span>
                        </a>
                    </div>
                </div>

                <div
                    class="w-full md:w-[35vw] lg:w-[30vw] h-[12vh] sm:h-[16vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center shrink-0 border-t md:border-t-0 md:border-l border-neutral-800 mt-2 md:mt-0 rounded-2xl md:rounded-none md:rounded-r-2xl">
                    <a href="https://github.com/adityakurnias" target="_blank" rel="noopener"
                        class="text-sm sm:text-base md:text-xl font-mono tracking-widest hover:text-white transition-colors duration-300 text-center px-4">
                        VIEW ALL PROJECTS &rarr;
                    </a>
                </div>
            </div>
        </section>

        <div class="h-[8vh] sm:h-[10vh] lg:h-[20vh] w-full bg-black"></div>
    </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, ref } from "vue";
import worksData from "~/contents/works.json";

gsap.registerPlugin(ScrollTrigger);

const projects = worksData.projects;
const mainWrapper = ref<HTMLElement | null>(null);
const headerSection = ref<HTMLElement | null>(null);
const scrollSection = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);

let mm: gsap.MatchMedia;

onMounted(() => {
    if (!mainWrapper.value || !scrollSection.value || !wrapper.value) return;

    mm = gsap.matchMedia(mainWrapper.value);

    const headerTl = gsap.timeline({
        scrollTrigger: {
            trigger: headerSection.value,
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
    });

    headerTl
        .to(".reveal-meta", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(".reveal-text", { y: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }, "-=0.8");

    mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
            const wrapperWidth = wrapper.value!.scrollWidth;
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
    });

    mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");

        cards.forEach((card) => {
            gsap.from(card, {
                y: 40,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                },
            });
        });
    });
});

onUnmounted(() => {
    if (mm) mm.revert();
});
</script>