import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  features: {
    inlineStyles: true,
  },

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
      routes: [
        "/",
        "/about",
        "/project/smk-plus-pelita-nusantara",
        "/project/synconomics",
        "/project/e-voting",
        "/project/trabsen",
        "/sitemap.xml",
      ],
    },
  },

  modules: ["@tresjs/nuxt"],
  tres: {
    devtools: true,
    glsl: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Aditya Kurnia Saputra — Front-End Developer & UI/UX Designer",
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1.0",
      meta: [
        {
          name: "description",
          content:
            "Portfolio of Aditya Kurnia Saputra, a Front-End Developer & UI/UX Designer based in Indonesia specializing in Vue, Nuxt, TypeScript, and modern web experiences.",
        },
        {
          name: "keywords",
          content:
            "Aditya Kurnia Saputra, Front-End Developer, Web Developer Indonesia, Nuxt Developer, Vue.js, UI/UX Designer, Software Engineer, Portfolio",
        },
        { name: "author", content: "Aditya Kurnia Saputra" },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#000000" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Aditya Kurnia Saputra — Front-End Developer" },
        {
          name: "twitter:description",
          content:
            "Portfolio of Aditya Kurnia Saputra, a Front-End Developer & UI/UX Designer specializing in modern web experiences.",
        },
        { name: "twitter:image", content: "/Images/og.webp" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Aditya Kurnia Saputra Portfolio" },
        { property: "og:title", content: "Aditya Kurnia Saputra — Front-End Developer" },
        {
          property: "og:description",
          content:
            "Portfolio of Aditya Kurnia Saputra, a Front-End Developer & UI/UX Designer based in Indonesia.",
        },
        { property: "og:image", content: "/Images/og.webp" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/webp" },
        { property: "og:image:alt", content: "Aditya Kurnia Saputra Portfolio" },
        { property: "og:locale", content: "en_US" },
      ],
      link: [
        { rel: "canonical", href: "https://kurnia.me" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" },
        { rel: "icon", type: "image/png", href: "/favicon-48x48.png", sizes: "48x48" },
        { rel: "icon", type: "image/png", href: "/favicon-192x192.png", sizes: "192x192" },
        { rel: "icon", type: "image/png", href: "/favicon-512x512.png", sizes: "512x512" },
        { rel: "apple-touch-icon", type: "image/png", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
});
