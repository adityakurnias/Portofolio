<template>
    <div
        class="relative min-h-screen overflow-hidden bg-black text-neutral-200"
    >
        <div
            ref="mainContainer"
            class="grid grid-cols-2 items-center px-16 h-screen"
        >
            <h2 class="title text-[10rem] font-bold leading-none">
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

            <div class="content px-10 flex flex-col justify-center space-y-8">
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
                <div
                    class="more-btn opacity-0 mt-5 translate-y-6 pointer-events-auto w-fit"
                >
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
    ScrollTrigger.refresh();

    ctx = gsap.context(() => {
        gsap.from(".reveal-char", {
            x: -50,
            filter: "blur(10px)",
            opacity: 0,
            stagger: 0.05,
            scrollTrigger: {
                trigger: ".title",
                start: "top 80%",
                end: "top 20%",
                scrub: 1.5,
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.value,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: 1,
            },
        });

        const split = new SplitText(".reveal-content", { type: "lines" });
        const masks: HTMLElement[] = [];

        split.lines.forEach((line) => {
            const mask = document.createElement("div");
            mask.className = "mask";
            line.style.position = "relative";
            line.appendChild(mask);
            masks.push(mask);
        });

        tl.to(masks, {
            scaleX: 0,
            transformOrigin: "right center",
            ease: "none",
            opacity: 0.5,
            duration: 1,
            stagger: 0.5,
        });

        tl.to(
            ".more-btn",
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            },
            "-=0.2",
        ); 

        tl.to(
            ".title, .content",
            {
                y: -100,
                filter: "blur(15px)",
                opacity: 0,
                duration: 2,
                ease: "power2.inOut",
            },
            "+=0.5",
        );
    }, mainContainer.value!);
});

onUnmounted(() => {
    if (ctx) ctx.revert();
});
</script>

<style scoped>
.reveal-content {
    overflow: hidden;
}

.more-btn {
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
}

:deep(.mask) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 10;
    pointer-events: none;
}
</style>
