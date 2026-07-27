<template>
    <div ref="contactWrapper" class="relative w-full bg-black text-neutral-200 pt-24 pb-20 selection:bg-white selection:text-black">
        <div class="container mx-auto px-6 lg:px-16">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div class="text-xs font-mono tracking-[0.2em] text-neutral-500 reveal-meta opacity-0">
                    03 — CONTACT
                </div>

                <div class="reveal-meta opacity-0 flex items-center gap-2.5 text-xs font-mono text-neutral-400">
                    <span class="uppercase tracking-wider">AVAILABLE FOR FREELANCE & FULL-TIME ROLES</span>
                </div>
            </div>

            <h2 class="title font-syncopate text-[11vw] lg:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase mb-16">
                <span class="block overflow-hidden">
                    <span class="reveal-title inline-block">LET'S WORK</span>
                </span>
                <span class="block overflow-hidden ml-[5%] lg:ml-[10%]">
                    <span class="reveal-title inline-block text-transparent stroke-text">
                        TOGETHER.
                    </span>
                </span>
            </h2>

            <div class="reveal-content opacity-0 max-w-5xl space-y-6">
                <span class="block text-xs font-mono tracking-widest text-neutral-500 uppercase">INQUIRIES / SAY HELLO</span>
                
                <div class="flex flex-col gap-6">
                    <a :href="`mailto:${email}`" 
                       class="text-2xl sm:text-4xl lg:text-5xl font-mono font-medium text-white hover:text-neutral-400 transition-colors duration-300 break-all underline decoration-neutral-800 underline-offset-8 hover:decoration-white">
                        {{ email }}
                    </a>

                    <div class="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs font-bold tracking-widest uppercase">
                        <button @click="copyEmail" 
                                type="button"
                                class="group flex items-center gap-3 text-white hover:text-neutral-400 transition-colors cursor-pointer py-1">
                            <span class="w-8 h-px bg-neutral-600 group-hover:w-12 group-hover:bg-white transition-all duration-300"></span>
                            <span>{{ copied ? '[ COPIED TO CLIPBOARD ]' : '[ COPY EMAIL ADDRESS ]' }}</span>
                        </button>

                        <a :href="`mailto:${email}`"
                           class="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors py-1">
                            <span class="w-8 h-px bg-neutral-700 group-hover:w-12 group-hover:bg-white transition-all duration-300"></span>
                            <span>SEND DIRECT EMAIL ↗</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="reveal-social opacity-0 mt-20 pt-10 border-t border-neutral-900">
                <span class="block text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">CONNECT / SOCIALS</span>
                
                <div class="flex flex-wrap gap-x-8 gap-y-4 font-mono text-sm">
                    <a v-for="social in socials" 
                       :key="social.name"
                       :href="social.url"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300 py-1">
                        <span class="group-hover:translate-x-0.5 transition-transform duration-300">{{ social.name }}</span>
                        <span class="text-xs text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">↗</span>
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactWrapper = ref<HTMLElement | null>(null);
const email = "adityakurniasaputra903@gmail.com";
const copied = ref(false);

const socials = [
    { name: "LINKEDIN", url: "https://www.linkedin.com/in/aditya-kurnia-saputra" },
    { name: "GITHUB", url: "https://github.com/adityakurnias" },
    { name: "INSTAGRAM", url: "https://www.instagram.com/dikrcy" }
];

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText(email);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error("Failed to copy email: ", err);
    }
};

let mm: gsap.MatchMedia;

onMounted(() => {
    if (!contactWrapper.value) return;

    mm = gsap.matchMedia(contactWrapper.value);

    mm.add("(min-width: 320px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contactWrapper.value,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        });

        tl.to(".reveal-meta", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" })
          .from(".reveal-title", { y: 100, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.4")
          .to(".reveal-content", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .to(".reveal-social", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
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