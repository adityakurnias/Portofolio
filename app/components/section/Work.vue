<template>
    <div ref="workWrapper" class="relative w-full bg-black text-neutral-200 py-24 selection:bg-white selection:text-black">
        <div class="container mx-auto px-6 lg:px-16">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div class="text-xs font-mono tracking-[0.2em] text-neutral-500 reveal-meta opacity-0">
                    02 — SELECTED WORKS
                </div>

                <div class="reveal-meta opacity-0 flex items-center gap-2.5 text-xs font-mono text-neutral-400">
                    <span class="uppercase tracking-wider">FEATURED PROJECTS (2024 — PRESENT)</span>
                </div>
            </div>

            <h2 class="title font-syncopate text-[11vw] lg:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase mb-20">
                <span class="block overflow-hidden">
                    <span class="reveal-title inline-block">SELECTED</span>
                </span>
                <span class="block overflow-hidden ml-[5%] lg:ml-[10%]">
                    <span class="reveal-title inline-block text-transparent stroke-text">
                        WORKS.
                    </span>
                </span>
            </h2>

            <div class="space-y-20 lg:space-y-32">
                <div v-for="(project, index) in projects" 
                     :key="project.id"
                     class="project-item group border-t border-neutral-900 pt-10 lg:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    <div class="lg:col-span-6 space-y-6">
                        <div class="flex items-center gap-4 font-mono text-xs text-neutral-500 tracking-widest uppercase">
                            <span>[{{ String(index + 1).padStart(2, '0') }}]</span>
                            <span class="w-8 h-px bg-neutral-800"></span>
                            <span>PROJECT SHOWCASE</span>
                        </div>

                        <h3 class="text-2xl sm:text-4xl lg:text-5xl font-syncopate font-bold text-white group-hover:text-neutral-300 transition-colors duration-300 leading-tight uppercase">
                            {{ project.title }}
                        </h3>

                        <p class="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-xl">
                            {{ project.description }}
                        </p>

                        <div class="pt-2">
                            <a :href="project.url"
                               class="group/link inline-flex items-center gap-4 font-mono text-xs font-bold tracking-widest uppercase text-white hover:text-neutral-400 transition-colors duration-300">
                                <span class="w-8 h-px bg-neutral-700 group-hover/link:w-12 group-hover/link:bg-white transition-all duration-300"></span>
                                <span>VIEW PROJECT ↗</span>
                            </a>
                        </div>
                    </div>

                    <div class="lg:col-span-6">
                        <a :href="project.url" 
                           class="block overflow-hidden relative aspect-16/10 bg-neutral-950 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out border border-white/5 hover:border-white/20">
                            <img :src="project.image" 
                                 :alt="project.title" 
                                 class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                 loading="lazy" />
                            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Footer Action -->
            <div class="reveal-footer opacity-0 mt-24 pt-12 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs uppercase tracking-widest">
                <span class="text-neutral-500">MORE REPOSITORIES & EXPERIMENTS</span>
                <a href="https://github.com/adityakurnias" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="group inline-flex items-center gap-3 text-white hover:text-neutral-400 transition-colors">
                    <span class="w-8 h-px bg-neutral-700 group-hover:w-12 group-hover:bg-white transition-all duration-300"></span>
                    <span>SEE ALL ON GITHUB ↗</span>
                </a>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, ref } from "vue";
import worksData from "~/contents/works.json";

gsap.registerPlugin(ScrollTrigger);

const projects = worksData.projects;
const workWrapper = ref<HTMLElement | null>(null);

let mm: gsap.MatchMedia;

onMounted(() => {
    if (!workWrapper.value) return;

    mm = gsap.matchMedia(workWrapper.value);

    mm.add("(min-width: 320px)", () => {
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: workWrapper.value,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        });

        headerTl
            .to(".reveal-meta", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" })
            .from(".reveal-title", { y: 100, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.4")
            .to(".reveal-footer", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2");

        const items = gsap.utils.toArray<HTMLElement>(".project-item");
        items.forEach((item) => {
            gsap.from(item, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
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

<style scoped>
.stroke-text {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
}
</style>