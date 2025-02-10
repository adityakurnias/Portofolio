<template>
  <main class="w-full bg-primary">
    <section class=" relativecontainer section-1 w-full h-screen">
      <div class="parent absolute top-0 left-0 z-20">
        <div class="wrap">
          <h1 class="text-text-primary font-bold text-9xl hello">Hello World</h1>
        </div>
      </div>
    </section>
    <section class="section-2 w-full h-screen bg-quaternary">
    </section>
  </main>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-1",
      start: "top",
      end: "bottom",
      scrub: true,
      markers: true
    }
  });
  tl.to(".hello", { 
    duration: 1,
    y: 800
   })
});
</script>

<style scoped>

</style>