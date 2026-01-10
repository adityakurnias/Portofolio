<template>
  <div class="relative min-h-screen overflow-hidden bg-black text-neutral-200">
    <div class="grid grid-cols-2 items-center px-8 bg-amber-600 h-screen">
      <h2 ref="titleRef" class="text-[15rem] font-bold leading-none">
        <span class="text-[13rem] block">Who</span>
        I Am
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const titleRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  if (!titleRef.value) return;

  const splitText = (element: HTMLElement) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    const textNodes: Node[] = [];
    let node;
    while(node = walker.nextNode()) textNodes.push(node);

    textNodes.forEach(textNode => {
      const text = textNode.textContent || "";
      const wrapper = document.createElement("span");
      
      text.split("").forEach(char => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.innerText = char === " " ? "\u00A0" : char;
        span.classList.add("reveal-char");
        wrapper.appendChild(span);
      });
      
      textNode.parentNode?.replaceChild(wrapper, textNode);
    });
  };

  splitText(titleRef.value);

  ctx = gsap.context(() => {
    const chars = titleRef.value?.querySelectorAll(".reveal-char");

    if (chars) {
      gsap.fromTo(chars, {
        x: -100,
        filter: 'blur(15px)',
        opacity: 0,
      }, {
        x: 0,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: titleRef.value,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "restart none none reset",
        },
      });
    }
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>