<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup></script>

<style>
.page-enter-active {
  animation: circleEnter 2.5s ease-out;
}

.page-leave-active {
  transition: all 1s ease-in;
  opacity: 0;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

@keyframes circleEnter {
  0% {
    clip-path: circle(0% at 50vw 50vh);
  }
  100% {
    clip-path: circle(150% at 50vw 50vh);
  }
}
</style>
