<template>
    <div class="relative min-h-screen overflow-hidden bg-black">
        <div class="absolute inset-0 z-0">
            <ClientOnly>
                <TresCanvas alpha>
                    <TresPerspectiveCamera
                        :position="[0, 0, 4]" 
                        :look-at="[0, 0, 0]"
                    />

                    <Suspense>
                        <GalaxyScene />
                    </Suspense>
                </TresCanvas>
            </ClientOnly>
        </div>

        <div
            class="relative z-10 pointer-events-none min-h-screen flex flex-col"
        >
            <div class="flex-1 flex flex-col justify-center px-10 md:px-24">
                <div class="max-w-4xl">
                    <h1
                        class="hero-text text-neutral-200 opacity-0 translate-y-20 text-[10vw] md:text-[8vw] font-black leading-[0.85] uppercase tracking-tighter"
                    >
                        KURNIAS <br />
                        <span
                            class="text-transparent"
                            style="
                                -webkit-text-stroke: 1px
                                    rgba(255, 255, 255, 0.5);
                            "
                            >A Creative Developer</span
                        >
                    </h1>
                    <div class="hero-btn opacity-0 mt-5 pointer-events-auto w-fit">
                        <a
                            href="#"
                            class="group flex items-center gap-4 text-sm text-neutral-200 font-bold tracking-widest uppercase"
                        >
                            <span
                                class="w-12 h-px bg-white group-hover:w-28 duration-500 ease-in-out transition-all"
                            ></span>
                            Begin Voyage
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gsap from "gsap";

onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.to(".hero-text", { opacity: 1, y: 0, duration: 2 })
        .to(".hero-btn", { opacity: 1, duration: 1 }, "-=1");
});
</script>

<style>
body {
    background-color: #020205;
    margin: 0;
}

/* Custom selection color */
::selection {
    background: #ffab40;
    color: white;
}
</style>
