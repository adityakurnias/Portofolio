<template>
    <div class="relative min-h-screen overflow-hidden bg-black font-sans text-neutral-200">
        <!-- 3D Background -->
        <div class="absolute inset-0 z-0 pointer-events-none">
            <ClientOnly>
                <TresCanvas alpha>
                    <TresPerspectiveCamera :position="[0, 0, 6]" :look-at="[0, 0, 0]" />
                    <Suspense>
                        <Machine />
                    </Suspense>
                </TresCanvas>
            </ClientOnly>
        </div>

        <div class="relative z-10 pointer-events-none min-h-screen flex flex-col justify-between">

            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-black/70 via-transparent to-transparent md:bg-none z-[-1]">
            </div>

            <div class="h-24"></div>

            <div class="flex-1 flex flex-col justify-center px-8 md:px-24">
                <div class="max-w-4xl relative">

                    <div class="hero-line absolute -left-4 md:-left-8 top-4 w-px h-0 bg-neutral-600"></div>

                    <h1
                        class="hero-text font-syncopate opacity-0 translate-y-10 text-[11vw] md:text-[8vw] font-black leading-[0.85] uppercase tracking-tighter drop-shadow-2xl">
                        KURNIAS <br />
                        <span class="text-transparent px-1 -ml-1"
                            style="-webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);">
                            Designing with Code
                        </span>
                    </h1>

                    <div class="hero-btn opacity-0 mt-10 pointer-events-auto w-fit">
                        <a href="#about" @click="scrollToSection($event, '#about')"
                            class="group flex items-center gap-4 text-xs md:text-sm text-neutral-200 font-bold tracking-[0.2em] uppercase px-3 py-2">
                            <span
                                class="w-8 md:w-12 h-px bg-white group-hover:w-20 duration-500 ease-in-out transition-all"></span>
                            Begin Voyage
                        </a>
                    </div>
                </div>
            </div>

            <div
                class="hero-hud pointer-events-none opacity-0 pb-8 px-8 md:px-24 w-full flex flex-row justify-between items-start md:items-end gap-4 text-[10px] md:text-xs font-mono tracking-widest text-neutral-500 uppercase">
                <div class="flex gap-4 md:gap-8 items-center">
                    <span class="inline-block">Frontend Developer</span>
                    <span class="inline-block">UI/UX Designer</span>
                    <span class="inline-block">Godot Developer</span>
                </div>
            </div>

            <div
                class="hero-side opacity-0 absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase">
                SCROLL TO INITIATE SEQUENCE
            </div>

        </div>
    </div>
</template>

<script setup>
import gsap from "gsap";

onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".hero-text", { opacity: 1, y: 0, duration: 1.5, delay: 0.2 })
        .to(".hero-line", { height: "80%", duration: 1 }, "-=1") 
        .to(".hero-desc", { opacity: 1, y: 0, duration: 1 }, "-=1")
        .to(".hero-btn", { opacity: 1, duration: 1 }, "-=0.5")
        .to(".hero-hud", { opacity: 1, duration: 1 }, "-=0.5")
        .to(".hero-side", { opacity: 1, duration: 1 }, "-=0.5");
});
</script>