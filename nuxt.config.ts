import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["./app/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "gsap",
        "gsap/ScrollTrigger",
        "lenis",
        "three",
      ],
    },
  },

  nitro: {
    preset: "bun",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  modules: ["@tresjs/nuxt"],
  tres: {
    devtools: true,
    glsl: true,
  },
});
