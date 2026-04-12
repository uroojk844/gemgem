import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  pages: true,
  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },

  modules: ["@pinia/nuxt"],
});