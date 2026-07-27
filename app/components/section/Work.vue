<template>
    <div ref="mainWrapper" class="bg-black text-neutral-200 overflow-x-hidden">
        <section ref="headerSection" class="h-[50vh] flex items-end px-6 lg:px-16 pb-12">
            <div class="overflow-hidden">
                <span class="text-xs font-mono tracking-[0.2em] text-neutral-500 block mb-4 reveal-meta opacity-0">
                    02 — SELECTED WORKS
                </span>

                <h2
                    class="font-syncopate text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight uppercase">
                    <div class="overflow-hidden">
                        <span class="block reveal-text translate-y-full">Recent</span>
                    </div>
                    <div class="overflow-hidden">
                        <span class="block reveal-text translate-y-full text-neutral-500">Works/Projects.</span>
                    </div>
                </h2>
            </div>
        </section>

        <!-- Container diubah menjadi h-auto di mobile agar bisa di-scroll vertikal natural -->
        <section ref="scrollSection" class="relative h-auto lg:h-screen overflow-hidden">
            <!-- flex-col untuk mobile, flex-row untuk desktop -->
            <div ref="wrapper"
                class="flex flex-col lg:flex-row gap-10 px-6 lg:px-16 h-full items-center w-full lg:w-fit will-change-transform pb-20 lg:pb-0">

                <div v-for="(project, index) in projects" :key="project.id"
                    class="project-card relative w-full lg:w-[45vw] h-[50vh] md:h-[60vh] lg:h-[70vh] shrink-0 group rounded-lg overflow-hidden">

                    <div
                        class="absolute -top-4 lg:-top-12 left-0 text-4xl font-light text-neutral-700 overflow-hidden z-30 pointer-events-none hidden lg:block">
                        <span
                            class="block translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            {{ String(index + 1).padStart(2, "0") }}
                        </span>
                    </div>

                    <!-- Hover grayscale dimatikan secara default di mobile, aktif di lg -->
                    <div
                        class="relative w-full h-full overflow-hidden rounded-lg lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700 ease-out">
                        <img :src="project.image"
                            class="project-image absolute inset-0 w-[120%] h-full object-cover object-center transition-transform duration-700"
                            style="left: -10%" />
                        <!-- Overlay lebih gelap di mobile agar teks selalu terbaca -->
                        <div
                            class="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-80 lg:opacity-60 lg:group-hover:opacity-100 transition-opacity duration-500">
                        </div>
                    </div>

                    <div class="absolute bottom-6 lg:bottom-8 left-6 lg:left-8 right-6 z-20 pointer-events-none">
                        <!-- Teks selalu tampil di mobile, tersembunyi & butuh hover di desktop -->
                        <h3 class="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-2 
                                   translate-y-0 opacity-100 
                                   lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 
                                   transition-all duration-500 delay-100">
                            {{ project.title }}
                        </h3>
                        <p class="text-xs md:text-sm lg:text-base text-neutral-300 max-w-sm 
                                  translate-y-0 opacity-100 
                                  lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 
                                  transition-all duration-500 delay-200 line-clamp-3 lg:line-clamp-none">
                            {{ project.description }}
                        </p>
                    </div>

                    <!-- Tombol view selalu muncul di tengah pada mobile (ukurannya disesuaikan) -->
                    <div
                        class="absolute top-8 right-8 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 
                                w-12 h-12 lg:w-24 lg:h-24 bg-white/20 lg:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center 
                                scale-100 lg:scale-0 lg:group-hover:scale-100 transition-transform duration-500 ease-out z-30">
                        <a :href="project.url"
                            class="text-[10px] lg:text-xs font-bold text-white tracking-widest uppercase w-full h-full flex items-center justify-center rounded-full">
                            <span class="lg:hidden">↗</span>
                            <span class="hidden lg:block">View</span>
                        </a>
                    </div>
                </div>

                <!-- Penyesuaian layout pembatas untuk View All -->
                <div
                    class="w-full lg:w-[30vw] h-[20vh] lg:h-[70vh] flex items-center justify-center shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-800 mt-10 lg:mt-0">
                    <a href="https://github.com/adityakurnias" target="_blank"
                        class="text-sm md:text-xl font-mono tracking-widest hover:text-white transition-colors duration-300">
                        VIEW ALL PROJECTS &rarr;
                    </a>
                </div>
            </div>
        </section>

        <div class="h-[10vh] lg:h-[20vh] w-full bg-black"></div>
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

    // Header Animasi (Berlaku untuk semua ukuran layar)
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

    // 💻 DESKTOP: Horizontal Scroll
    mm.add("(min-width: 1024px)", () => {
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
    });

    // 📱 MOBILE: Vertical Scroll dengan fade-in sederhana
    mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");

        cards.forEach((card) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });
        });
    });
});

onUnmounted(() => {
    if (mm) mm.revert();
});
</script>