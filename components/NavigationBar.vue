<template>
  <nav
    class="fixed top-0 right-0 w-1 text-center leading-none px-8 py-4 flex flex-col justify-center items-center text-wrap whitespace-break-spaces break-words z-10 group"
  >
    <span class="icon text-4xl transition-all duration-700 group-hover:rotate-45">⨌</span>
    <ul
      class=" group-hover:max-h-[30rem] text-xl font-semibold pt-2.5 w-3 max-h-[30rem] overflow-hidden transition-all duration-700"
      v-auto-animate
    >
      <li
        class="text-center transition-all leading-4 relative before:transition-all before:ease-in-out hover:leading-6 hover:before:h-full before:content-[''] before:w-5 before:h-0 before:bg-text-primary before:absolute before:-z-10 before:-right-1"
      >
        <NuxtLink to="/" class="">Bio</NuxtLink>
      </li>
      <span>•</span>
      <li
        class="text-center transition-all leading-4 relative before:transition-all before:ease-in-out hover:leading-6 hover:before:h-full before:content-[''] before:w-5 before:h-0 before:bg-text-primary before:absolute before:-z-10 before:-right-1"
      >
        <NuxtLink to="/projects" class="" prefetch-on="visibility"
          >Projects</NuxtLink
        >
      </li>
      <span>•</span>
      <li
        class="text-center transition-all leading-4 relative before:transition-all before:ease-in-out hover:leading-6 hover:before:h-full before:content-[''] before:w-5 before:h-0 before:bg-text-primary before:absolute before:-z-10 before:-right-1"
      >
        <NuxtLink
          to="/contact"
          class="cursor-pointer"
          >Contact</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
onMounted(() => {
  const ul = document.querySelector("ul");
  const icon = document.querySelector(".icon");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      icon?.classList.add("rotate-90");
      if (ul?.classList.contains("max-h-[30rem]")) {
        ul?.classList.replace("max-h-[30rem]", "max-h-0");
      }
    } else {
      icon?.classList.remove("rotate-90");
      if (ul?.classList.contains("max-h-0")) {
        ul?.classList.replace("max-h-0", "max-h-[30rem]");
      }
    }
  });
});
</script>

<style scoped>
@reference "tailwindcss";

li:has(.router-link-active) {
  @apply before:h-full leading-6;
}

li:has(.router-link-active):hover {
  @apply before:h-0 leading-4;
}
</style>
