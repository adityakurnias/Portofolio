<template>
  <div class="relative w-full">

    <nav
      class="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-60 flex w-[calc(100vw-1rem)] sm:w-[min(90vw,42rem)] items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-neutral-900/40 px-4 py-2 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:px-6"
      :class="{ 'justify-between': !isMenuOpen, 'sm:w-[min(95vw,64rem)] justify-between': isMenuOpen }">

      <div class="text-base sm:text-lg font-black tracking-tighter text-white uppercase italic overflow-hidden">
        <a href="/" class="hover-rotate-text block relative">
          <span>KURNIAS.</span>
        </a>
      </div>

      <div ref="navLinksRef"
        class="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-300 transition-opacity duration-300"
        :class="{ 'opacity-0 pointer-events-none': isMenuOpen }">
        <a href="#about" class="hover-rotate-text relative overflow-hidden"><span>About</span></a>
        <a href="#work" class="hover-rotate-text relative overflow-hidden"><span>Work</span></a>
        <a href="#contact" class="hover-rotate-text relative overflow-hidden"><span>Contact</span></a>
      </div>

      <button @click="toggleMenu"
        class="relative z-50 overflow-hidden rounded-full bg-white px-4 py-2 text-xs font-bold tracking-wide text-black transition-transform hover:scale-105 active:scale-95 sm:px-5 sm:py-2.5 group">
        <span
          class="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          :class="isMenuOpen ? '-translate-y-full' : 'translate-y-0'">
          MENU
        </span>
        <span
          class="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          :class="isMenuOpen ? 'translate-y-0' : 'translate-y-full'">
          CLOSE
        </span>
        <span class="opacity-0">CLOSE</span>
      </button>
    </nav>

    <div ref="menuOverlay"
      class="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] clip-hidden invisible overflow-y-auto">

      <div
        class="container mx-auto grid h-full grid-cols-1 gap-12 px-6 py-24 sm:px-8 md:px-12 lg:grid-cols-2 lg:px-20 lg:py-32">

        <div class="flex flex-col justify-center space-y-2 pt-16 lg:pt-0">
          <div v-for="(item, index) in menuItems" :key="index" class="overflow-hidden group">
            <a :href="item.link" @click="toggleMenu"
              class="menu-link-item block origin-left text-[clamp(3rem,14vw,6rem)] font-bold leading-none text-neutral-400 transition-all duration-300 hover:italic hover:text-white will-change-transform">
              {{ item.name }}
            </a>
          </div>
        </div>

        <div
          class="menu-info-stagger flex flex-col justify-end space-y-8 pb-10 text-neutral-400 items-start lg:items-end">
          <div class="text-left lg:text-right">
            <h4 class="text-xs font-bold text-white mb-4 uppercase tracking-widest">Connect</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="https://www.instagram.com/dikrcy" class="hover:text-white transition-colors">Instagram</a>
              </li>
              <li><a href="https://www.linkedin.com/in/aditya-kurnia-saputra"
                  class="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/adityakurnias" class="hover:text-white transition-colors">GitHub</a></li>

            </ul>
          </div>
          <div class="text-left lg:text-right">
            <h4 class="text-xs font-bold text-white mb-4 uppercase tracking-widest">Get in touch</h4>
            <a href="mailto:adityakurniasaputra903@gmail.com"
              class="text-xl sm:text-2xl hover:text-white hover:underline decoration-1 underline-offset-4 transition-all">Email
              Me</a>
          </div>
        </div>

      </div>

      <div
        class="menu-info-stagger md:hidden absolute bottom-6 left-0 flex w-full justify-between gap-4 px-6 text-xs text-neutral-500 sm:px-8">
        <span>Aditya Kurnia Saputra</span>
        <span>&copy; 2026</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const isMenuOpen = ref(false);
const menuOverlay = ref(null);
const navLinksRef = ref(null);

const menuItems = [
  { name: 'HOME', link: '#' },
  { name: 'ABOUT', link: '#about' },
  { name: 'WORK', link: '#work' },
  { name: 'CONTACT', link: '#contact' },
];

let ctx: gsap.Context;
let splits: SplitText[] = [];

const initHoverEffect = () => {
  const elements = document.querySelectorAll(".hover-rotate-text");
  const queue: { original: Element; clone: Element; element: Element }[] = [];

  // Phase 1: Batch DOM Writes (Remove & Append clones)
  elements.forEach((element) => {
    const existingClone = element.querySelector(".clone-text");
    if (existingClone) existingClone.remove();

    const original = element.querySelector("span");
    if (!original) return;

    const clone = original.cloneNode(true) as HTMLElement;
    clone.classList.add("clone-text");
    clone.setAttribute("aria-hidden", "true");

    gsap.set(clone, { position: "absolute", top: 0, left: 0, width: "100%", pointerEvents: "none" });
    element.appendChild(clone);
    queue.push({ original, clone, element });
  });

  // Phase 2: Batch SplitText & GSAP timeline setup in next frame to prevent interleaved DOM reads/writes
  requestAnimationFrame(() => {
    queue.forEach(({ original, clone, element }) => {
      const oSplit = new SplitText(original, { type: "chars", aria: "none" });
      const cSplit = new SplitText(clone, { type: "chars", aria: "none" });
      splits.push(oSplit, cSplit);

      gsap.set(cSplit.chars, { rotationX: -90, opacity: 0, transformOrigin: "50% 50% -20" });

      const tl = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: "power2.inOut" } });

      tl.to(oSplit.chars, { rotationX: 90, opacity: 0, stagger: 0.02 })
        .to(cSplit.chars, { rotationX: 0, opacity: 1, stagger: 0.02 }, 0);

      const playTl = () => tl.play();
      const reverseTl = () => tl.reverse();

      element.addEventListener("mouseenter", playTl);
      element.addEventListener("mouseleave", reverseTl);
      (element as any)._gsapHover = { playTl, reverseTl };
    });
  });
};

const toggleMenu = () => {
  if (!menuOverlay.value) return;

  isMenuOpen.value = !isMenuOpen.value;
  const isOpen = isMenuOpen.value;

  gsap.killTweensOf([menuOverlay.value, ".menu-link-item", ".menu-info-stagger"]);

  const tl = gsap.timeline();

  if (isOpen) {
    gsap.set(menuOverlay.value, { visibility: 'visible' });

    tl.fromTo(menuOverlay.value,
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power4.inOut"
      }
    );

    tl.fromTo(".menu-link-item",
      { y: 150, skewY: 10, opacity: 0 },
      { y: 0, skewY: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(".menu-info-stagger",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.8"
    );

  } else {
    tl.to(menuOverlay.value, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", // Tutup ke bawah
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(menuOverlay.value, { visibility: 'hidden', clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }); // Reset clip path to top
      }
    });
  }
};

onMounted(() => {
  ctx = gsap.context(() => {
    initHoverEffect();
  });
});

onUnmounted(() => {
  splits.forEach(s => s.revert());
  document.querySelectorAll(".hover-rotate-text").forEach(el => {
    const { playTl, reverseTl } = el._gsapHover || {};
    if (playTl) el.removeEventListener("mouseenter", playTl);
    if (reverseTl) el.removeEventListener("mouseleave", reverseTl);
  });
  if (ctx) ctx.revert();
});
</script>

<style scoped>
.clip-hidden {
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
}
</style>