<template>
    <div
        ref="mainContainer"
        class="bg-black text-neutral-200 min-h-screen w-full overflow-x-hidden selection:bg-white selection:text-black"
    >

        <section class="pt-32 px-6 lg:px-16 mb-20">
            <div class="border-b border-neutral-800 pb-12">
                <span
                    class="block text-xs tracking-[0.2em] text-neutral-500 mb-6 reveal-item"
                >
                    01.1 - MORE ABOUT ME
                </span>
                <h1
                    class="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
                >
                    <div class="overflow-hidden">
                        <span class="block reveal-text translate-y-full"
                            >Crafting</span
                        >
                    </div>
                    <div class="overflow-hidden">
                        <span
                            class="block reveal-text translate-y-full text-neutral-500"
                            >Digital Reality.</span
                        >
                    </div>
                </h1>
            </div>
        </section>

        <section
            class="px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32"
        >
            <div class="lg:col-span-5 relative">
                <div
                    class="image-wrapper relative w-full h-[60vh] overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700"
                >
                    <img
                        ref="profileImage"
                        src="/Images/Self.jpg"
                        class="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform"
                    />
                    <div
                        class="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                    >
                        <span class="text-xs font-mono text-white"
                            >EST. 2008</span
                        >
                    </div>
                </div>
            </div>

            <div class="lg:col-span-7 flex flex-col justify-center space-y-8">
                <h3
                    class="text-2xl md:text-3xl font-light leading-snug reveal-bio opacity-0 translate-y-8"
                >
                    I'm a
                    <span class="text-white font-bold"
                        >Front-End Developer</span
                    >
                    based in Indonesia, crafting modern web interfaces with a
                    strong focus on
                    <span class="text-white font-bold">UI/UX</span> and seamless
                    user experiences.
                </h3>

                <div
                    class="space-y-6 text-neutral-400 text-base md:text-lg leading-relaxed reveal-bio opacity-0 translate-y-8"
                >
                    <p>
                        I specialize in building clean, responsive, and scalable
                        front-end applications using modern frameworks like
                        <span class="text-neutral-200 font-medium">Nuxt</span>.
                        I care deeply about structure, performance, and how
                        every interaction feels to the user.
                    </p>
                    <p>
                        For me, front-end development is more than assembling
                        components. It's about translating ideas into intuitive
                        digital experiences that feel smooth, intentional, and
                        reliable—whether it's a landing page or a full web
                        application.
                    </p>
                </div>

                <div class="pt-8 reveal-bio opacity-0 translate-y-8">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg"
                        class="h-12 invert opacity-50 mb-4"
                        alt="Signature"
                    />
                    <!-- <button
                        class="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-neutral-400 transition-colors"
                    >
                        Download CV
                        <span
                            class="block w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"
                        ></span>
                    </button> -->
                </div>
            </div>
        </section>

        <section class="px-6 lg:px-16 pb-32">
            <div class="flex items-end justify-between mb-12">
                <h2 class="text-4xl font-bold text-white reveal-stack">
                    Tech Stack
                </h2>
                <span
                    class="hidden md:block text-xs font-mono text-neutral-500 reveal-stack"
                    >(WHAT I DO BEST)</span
                >
            </div>

            <div class="border-t border-neutral-800">
                <div
                    v-for="(item, i) in services"
                    :key="i"
                    class="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-neutral-800 cursor-default transition-colors hover:bg-neutral-900/30 service-item opacity-0"
                >
                    <div class="flex items-center gap-8">
                        <span
                            class="text-xs font-mono text-neutral-600 group-hover:text-white transition-colors"
                            >0{{ i + 1 }}</span
                        >
                        <h4
                            class="text-2xl md:text-4xl font-medium text-neutral-300 group-hover:text-white transition-colors"
                        >
                            {{ item.name }}
                        </h4>
                    </div>
                    <div class="mt-4 md:mt-0 flex items-center gap-4 md:gap-12">
                        <p
                            class="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors"
                        >
                            {{ item.desc }}
                        </p>
                        <span
                            class="text-xl text-neutral-600 group-hover:text-white group-hover:-rotate-45 transition-all duration-300"
                        >
                            &rarr;
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <div class="w-full flex justify-center mb-20 mt-10">
            <div class="mt-8">
                <NuxtLink
                    to="/"
                    class="group inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase hover:text-white transition-colors"
                >
                    <div
                        class="relative overflow-hidden w-12 h-px bg-neutral-600 group-hover:bg-white transition-colors duration-300"
                    >
                        <span
                            class="absolute top-0 left-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                        ></span>
                    </div>
                    Go Back
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mainContainer = ref<HTMLElement | null>(null);
const profileImage = ref<HTMLElement | null>(null);

const services = [
    { name: "Frontend Development", desc: "Vue, Nuxt, React" },
    { name: "Backend Integration", desc: "Laravel, Hono, Nuxt" },
    { name: "UI/UX Design", desc: "Figma, Prototyping" },
];

let ctx: gsap.Context;

onMounted(() => {
    ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.to(".reveal-item", { opacity: 1, duration: 1 }).to(
            ".reveal-text",
            {
                y: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
            },
            "-=0.5",
        );

        gsap.from(".image-wrapper", {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: ".image-wrapper",
                start: "top 85%",
            },
        });

        gsap.to(profileImage.value, {
            y: "-20%",
            ease: "none",
            scrollTrigger: {
                trigger: ".image-wrapper",
                start: "top 85%",
                end: "bottom top",
                scrub: 1,
            },
        });

        gsap.to(".reveal-bio", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".reveal-bio",
                start: "top 85%",
                end: "bottom top",
                scrub: 1,
            },
        });

        gsap.to(".service-item", {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".service-item",
                start: "top 90%",
            },
        });

        gsap.from(".reveal-stack", {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".reveal-stack",
                start: "top 85%",
            },
        });
    }, mainContainer.value);
});

onUnmounted(() => {
    if (ctx) ctx.revert();
});
</script>

<style scoped>
/* Custom Utility untuk animasi teks */
.reveal-text {
    will-change: transform;
}
</style>
