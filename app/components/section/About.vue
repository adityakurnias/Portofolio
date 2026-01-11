<template>
    <div
        class="relative min-h-screen overflow-hidden bg-black text-neutral-200"
    >
        <div
            ref="mainContainer"
            class="grid grid-cols-2 items-center px-8 h-screen"
        >
            <h2 class="text-[10rem] font-bold leading-none">
                <span class="block">
                    <span
                        v-for="(char, i) in 'Who'"
                        :key="i"
                        class="reveal-char inline-block"
                        >{{ char }}</span
                    >
                </span>
                <span
                    v-for="(char, i) in ' I Am'"
                    :key="i"
                    class="reveal-char inline-block"
                >
                    {{ char === " " ? "\u00A0" : char }}
                </span>
            </h2>

            <div class="px-10 flex flex-col justify-center space-y-8">
                <p class="reveal-content font-medium text-base">
                    I’m a web developer who likes to learn by building and
                    figuring things out as I go. I enjoy working with people,
                    chatting through ideas, and slowly shaping simple thoughts
                    into real, working websites. For me, the process matters
                    just as much as the result—experimenting, fixing things, and
                    learning from mistakes along the way. Every project, big or
                    small, is a chance for me to grow and improve. I prefer
                    keeping things simple and straightforward, with clear
                    communication and a comfortable working flow, so ideas can
                    turn into something real without feeling complicated or
                    overwhelming.
                </p>
                <div class="hero-btn opacity-0 mt-5 pointer-events-auto w-fit">
                    <NuxtLink
                        to="/about"
                        class="group flex items-center gap-4 text-sm text-neutral-200 font-bold tracking-widest uppercase"
                    >
                        <span
                            class="w-12 h-px bg-white group-hover:w-28 duration-500 ease-in-out transition-all"
                        ></span>
                        Discover More
                    </NuxtLink>
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
let ctx: gsap.Context;

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.from(".reveal-char", {
            x: -50,
            filter: "blur(10px)",
            opacity: 0,
            stagger: 0.05,
            scrollTrigger: {
                trigger: ".reveal-char",
                start: "top 80%",
                end: "top 20%",
                scrub: 1.5,
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.value,
                start: "top top",
                end: "+=250%",
                pin: true,
                scrub: 5,
            },
        });

        const split = new SplitText(".reveal-content", { type: "lines" });

        split.lines.forEach((line) => {
            const mask = document.createElement("div");
            mask.className = "mask";
            line.appendChild(mask);

            tl.to(
                mask,
                {
                    scaleX: 0,
                    opacity: 0.2,
                    transformOrigin: "right center",
                    ease: "power2.out",
                    duration: 0.1,
                },
                ">",
            );
        });

        tl.to(".hero-btn", { opacity: 1, duration: 1 }, ">");
    }, mainContainer.value!);
});

onUnmounted(() => {
    if (ctx) ctx.revert();
});
</script>

<style scoped>
:deep(.reveal-content h1 div) {
    position: relative;
    display: block;
    overflow: hidden;
}

:deep(.mask) {
    position: absolute;
    inset: 0;
    background: black;
    z-index: 10;
    pointer-events: none;
    transform-origin: right center;
}
</style>
