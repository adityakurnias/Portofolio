<template>
  <nav class="fixed top-0 right-0 w-1 break-words leading-none p-8 z-50">
    <ul class="text-xl font-semibold" v-auto-animate>
      <li
        class="text-center transition-all leading-4 relative before:transition-all before:ease-in-out hover:leading-6 hover:before:h-full before:content-[''] before:w-5 before:h-0 before:bg-white before:absolute before:-z-10 before:-right-4"
      >
        <NuxtLink to="/" class="cursor-pointer" >Bio</NuxtLink>
      </li>
      <span>•</span>
      <li
        class="text-center transition-all leading-4 relative before:transition-all before:ease-in-out hover:leading-6 hover:before:h-full before:content-[''] before:w-5 before:h-0 before:bg-white before:absolute before:-z-10 before:-right-4"
      >
        <NuxtLink to="/projects" class="cursor-pointer" prefetch-on="visibility">Projects</NuxtLink>
      </li>
      <span>•</span>
      <li
        class="text-center transition-all leading-4 relative before:transition-all before:ease-in-out hover:leading-6 hover:before:h-full before:content-[''] before:w-5 before:h-0 before:bg-white before:absolute before:-z-10 before:-right-4"
      >
        <NuxtLink to="mailto:adityakurniasaputra903@gmail.com" class="cursor-pointer">Contact</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
li:has(.router-link-active){
  @apply before:h-full leading-6;
}

li:has(.router-link-active):hover {
  @apply before:h-0 leading-4;
}
</style>