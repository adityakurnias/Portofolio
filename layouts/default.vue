<template>
  <div class=" w-full min-h-screen bg-primary">
    <navigation-bar />
    <slot />
    <div class="cursor-follower"></div>
  </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

onMounted(() => {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });

  gsap.ticker.lagSmoothing(0);

  window.addEventListener("mousemove", (e) => {
    const targetElement = e.target as HTMLElement;
    const isTargetLinkOrBtn = Boolean(
      targetElement?.closest("a") || targetElement?.closest("button")
    );
    gsap.to(".cursor-follower", {
      duration: 0.6,
      ease: "power4",
      opacity: 1,
      x: e.clientX - 10,
      y: e.clientY - 10,
      transform: `scale(${isTargetLinkOrBtn ? 3 : 1})`,
    });
  })
});
</script>

<style scoped>
.cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  backdrop-filter: invert(1);
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  z-index: 10000;
  user-select: none;
  pointer-events: none;
}
</style>
