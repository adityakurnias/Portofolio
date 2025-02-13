// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  routeRules: {
    '/': { prerender: false },
    '/projects': { prerender: true },
    '/contact': { prerender: true },
  },

  css: ["assets/css/index.css"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },
      title: "Aditya Kurnia Saputra | Portfolio",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        { href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap", rel: "stylesheet" }
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@formkit/auto-animate"],
});
