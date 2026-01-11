<template>
    <div ref="projectSection" class="min-h-screen w-screen py-20">
        <h2 class="text-4xl font-bold text-neutral-200">Works</h2>
        <div class="w-full px-16">
            <div class="flex flex-col md:flex-row gap-4 h-[500px] project-grid">
                <div
                    v-for="project in projects"
                    :key="project.id"
                    class="project-card relative overflow-hidden rounded-2xl flex-1"
                    @mouseenter="onHover"
                    @mouseleave="onLeave"
                >
                    <img
                        :src="project.image"
                        class="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        class="absolute inset-0 bg-black/50 p-8 flex flex-col justify-end text-white"
                    >
                        <h3 class="text-2xl font-bold project-title">
                            {{ project.title }}
                        </h3>
                        <p class="project-desc opacity-0 translate-y-4">
                            {{ project.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import worksData from "~/contents/works.json";

const projects = worksData.projects;

const projectSection = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

gsap.registerPlugin(ScrollTrigger);

const onHover = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const parent = target.parentElement;
    if (!parent) return;

    const others = parent.querySelectorAll(".project-card");

    gsap.to(target, {
        flex: 3,
        duration: 0.6,
        ease: "power4.out",
    });

    gsap.to(target.querySelector(".project-desc"), {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
    });

    others.forEach((el) => {
        if (el !== target) {
            gsap.to(el, {
                flex: 0.5,
                duration: 0.6,
                ease: "power4.out",
            });

            gsap.to(el.querySelector(".project-title"), {
                opacity: 0,
                duration: 0.2,
            });
        }
    });
};

const onLeave = (e: MouseEvent) => {
    const parent = (e.currentTarget as HTMLElement).parentElement;
    if (!parent) return;

    gsap.to(parent.querySelectorAll(".project-card"), {
        flex: 1,
        duration: 0.6,
        ease: "power4.out",
    });

    gsap.to(parent.querySelectorAll(".project-title"), {
        opacity: 1,
        duration: 0.3,
    });

    gsap.to(parent.querySelectorAll(".project-desc"), {
        opacity: 0,
        y: 20,
        duration: 0.3,
    });
};

onMounted(() => {
    ScrollTrigger.refresh();

    ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");

        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".project-grid",
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1,
                },
            },
        );
    }, projectSection.value!);
});

onUnmounted(() => {
    ctx?.revert();
});
</script>
