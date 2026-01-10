<template>
  <nav class="z-50 w-fit mx-auto mt-4 flex items-center gap-6 px-8 py-4 pointer-events-auto backdrop-blur-lg bg-white/5 rounded-md border-white/10 border">
    <div class="text-xl text-neutral-200 font-black tracking-tighter uppercase italic flex items-center">
      <a href="#" class="hover-rotate-text inline-block relative overflow-hidden">
        <span>KURNIAS.</span>
      </a>
    </div>
    <div class="hidden text-neutral-200 md:flex gap-8 text-sm font-medium opacity-60">
      <a href="#" class="hover-rotate-text inline-block relative overflow-hidden hover:opacity-100 transition">
        <span>About</span>
      </a>
      <a href="#" class="hover-rotate-text inline-block relative overflow-hidden hover:opacity-100 transition">
        <span>Work</span>
      </a>
      <a href="#" class="hover-rotate-text inline-block relative overflow-hidden hover:opacity-100 transition">
        <span>Contact</span>
      </a>
    </div>
    <button class="bg-neutral-200 text-black px-4 py-2 cursor-pointer rounded-full font-bold text-xs pointer-events-auto hover:scale-105 transition-transform active:scale-95">
      MENU
    </button>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

let splits = []; 

const initHoverEffect = () => {
  const elements = document.querySelectorAll(".hover-rotate-text");

  elements.forEach((element) => {
    const original = element.querySelector("span");
    
    const clone = original.cloneNode(true);
    gsap.set(clone, { 
      position: "absolute", 
      top: 0, 
      left: 0, 
      width: "100%",
      pointerEvents: "none" 
    });
    element.appendChild(clone);

    const oSplit = new SplitText(original, { type: "chars" });
    const cSplit = new SplitText(clone, { type: "chars" });
    
    splits.push(oSplit, cSplit); 

    gsap.set(cSplit.chars, {
      rotationX: -90,
      opacity: 0,
      transformOrigin: "50% 50% -20",
    });

    const tl = gsap.timeline({ 
      paused: true,
      defaults: { duration: 0.4, ease: "power2.inOut" } 
    });

    tl.to(oSplit.chars, {
      rotationX: 90,
      opacity: 0,
      stagger: 0.02,
    })
    .to(cSplit.chars, {
      rotationX: 0,
      opacity: 1,
      stagger: 0.02,
    }, 0); 

    const playTl = () => tl.play();
    const reverseTl = () => tl.reverse();

    element.addEventListener("mouseenter", playTl);
    element.addEventListener("mouseleave", reverseTl);
    
    element._gsapHover = { playTl, reverseTl };
  });
};

onMounted(() => {
  initHoverEffect();
});

onUnmounted(() => {
  splits.forEach(s => s.revert());
  document.querySelectorAll(".hover-rotate-text").forEach(el => {
    const { playTl, reverseTl } = el._gsapHover || {};
    el.removeEventListener("mouseenter", playTl);
    el.removeEventListener("mouseleave", reverseTl);
  });
});
</script>