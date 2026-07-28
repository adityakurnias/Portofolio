<template>
  <div ref="mainContainer"
    class="bg-black text-neutral-200 min-h-screen w-full overflow-x-hidden selection:bg-white selection:text-black">

    <div class="w-full flex justify-center mb-12 mt-10">
      <div class="mt-8">
        <NuxtLink to="/#work"
          class="group inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-white transition-colors">
          <div
            class="relative overflow-hidden w-12 h-px bg-neutral-600 group-hover:bg-white transition-colors duration-300">
            <span
              class="absolute top-0 left-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
          </div>
          Go Back
        </NuxtLink>
      </div>
    </div>

    <section class="pt-16 md:pt-24 px-6 lg:px-16 mb-16">
      <div class="border-b border-neutral-800 pb-12">
        <span class="block text-xs md:text-sm tracking-[0.2em] text-neutral-500 mb-6 font-medium uppercase reveal-item">
          02.{{ foundProject?.id }} &mdash; Project
        </span>

        <h1 class="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-white mb-6">
          <div class="overflow-hidden pb-4">
            <span class="block reveal-text">{{ foundProject?.title }}</span>
          </div>
        </h1>

        <div class="overflow-hidden pb-6 max-w-4xl">
          <span class="block reveal-text text-lg md:text-xl lg:text-2xl font-light text-neutral-400 leading-relaxed">
            {{ foundProject?.description }}
          </span>
        </div>

        <div class="overflow-hidden flex flex-wrap justify-start items-center gap-8 mt-2">
          <a v-if="foundProject?.url && foundProject.url !== '#'" :href="foundProject?.url" target="_blank"
            class="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-white transition-colors reveal-item">
            Visit Site
            <span
              class="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
          </a>
          <a v-if="foundProject?.source && foundProject.source !== '#'" :href="foundProject?.source" target="_blank"
            class="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-white transition-colors reveal-item">
            Source Code
            <span
              class="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
          </a>
        </div>
      </div>
    </section>

    <section class="px-6 lg:px-16 mb-32 w-full flex flex-col items-center">

      <div class="w-full flex justify-center">
        <figure class="w-full lg:w-5/6">
          <img :src="imageUrl" :alt="foundProject?.title"
            class="w-full h-auto object-cover rounded-xl shadow-2xl border border-neutral-900" />
        </figure>
      </div>

      <div class="mt-16 w-full max-w-3xl px-4 md:px-0">
        <div v-html="foundProject?.content"
          class="text-base md:text-lg text-neutral-300 leading-loose font-light whitespace-pre-wrap reveal-item">
        </div>

        <div v-if="foundProject?.stack && foundProject.stack.length > 0"
          class="mt-16 pt-10 border-t border-neutral-900 reveal-item">
          <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-6">
            Tech Stack
          </h3>
          <ul class="flex flex-wrap gap-3">
            <li v-for="tech in foundProject.stack" :key="tech"
              class="px-5 py-2 bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-full font-medium tracking-wide hover:border-neutral-600 hover:text-white transition-colors cursor-default">
              {{ tech }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div class="w-full flex justify-center mb-12 mt-10">
      <div class="mt-8">
        <NuxtLink to="/#work"
          class="group inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-white transition-colors">
          <div
            class="relative overflow-hidden w-12 h-px bg-neutral-600 group-hover:bg-white transition-colors duration-300">
            <span
              class="absolute top-0 left-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
          </div>
          Go Back
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import projectData from "~/contents/pages/projects.json";
const route = useRoute();
const projectSlug = route.params.project;

const projects = projectData.projects || [];

const foundProject = projects.find((p: any) => p.slug === projectSlug);

if (!foundProject) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project Not Found",
    fatal: true,
  });
}

const imageUrl = computed(() => foundProject?.image || "");

const fullImageUrl = computed(() => {
  if (!foundProject?.image) return "https://kurnia.me/Images/og.webp";
  return foundProject.image.startsWith("http")
    ? foundProject.image
    : `https://kurnia.me${foundProject.image}`;
});

const pageUrl = computed(() => `https://kurnia.me/project/${foundProject.slug}`);

useSeoMeta({
  title: `${foundProject.title} — Project by Aditya Kurnia Saputra`,
  description: foundProject.description,
  ogTitle: `${foundProject.title} — Aditya Kurnia Saputra`,
  ogDescription: foundProject.description,
  ogImage: fullImageUrl,
  ogUrl: pageUrl,
  twitterCard: "summary_large_image",
  twitterTitle: `${foundProject.title} — Aditya Kurnia Saputra`,
  twitterDescription: foundProject.description,
  twitterImage: fullImageUrl,
});

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": foundProject.title,
        "description": foundProject.description,
        "image": fullImageUrl.value,
        "url": pageUrl.value,
        "author": {
          "@type": "Person",
          "name": "Aditya Kurnia Saputra",
          "url": "https://kurnia.me"
        },
        "keywords": (foundProject.stack || []).join(", ")
      })
    }
  ]
});
</script>

<style></style>