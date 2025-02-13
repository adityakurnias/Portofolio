<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="error-page flex flex-col items-center justify-center h-screen bg-red-200 text-center p-5 text-red-900">
    <h1 v-if="error" class="error-code text-5xl font-bold">{{ error.statusCode }}</h1>
    <p v-if="error" class="error-message text-2xl mx-2.5">{{ error.message || 'Something went wrong. Please try again later.' }}</p>
    <NuxtLink to="/" class="home-link">Go back home</NuxtLink>
  </div>
</template>