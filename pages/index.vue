<template>
  <main class="w-screen min-h-screen bg-primary">
    <section class="w-full h-full">
      <div id="hero" class="h-32 overflow-hidden">
        <h1 class="text-text-primary font-bold text-9xl menu-item-active">
          Hello World
        </h1>
        <h2 class="text-text-primary font-bold text-9xl menu-item">
          I'm Aditya
        </h2>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
onMounted(() => {
  const menuItems = document.querySelectorAll("#hero");
  menuItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      const hoverElement = item.querySelector(".menu-item-active");
      const el = item.querySelector(".menu-item");
      gsap.to(hoverElement, { yPercent: -70, duration: 0.3, ease: "sine.in" });
      gsap.to(el, { yPercent: -100, duration: 0.3, ease: "sine.out" });
    });
  });
  menuItems.forEach((item) => {
    item.addEventListener("mouseout", () => {
      const hoverElement = item.querySelector(".menu-item-active");
      const el = item.querySelector(".menu-item");
      gsap.to(hoverElement, { yPercent: 100, duration: 0.3, ease: "sine.out" });
      gsap.to(el, { yPercent: 0, duration: 0.3, ease: "sine.in" });
    });
  });
});
</script>

<style></style>
