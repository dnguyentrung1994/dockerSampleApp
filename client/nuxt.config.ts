import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  plugins: [{ src: "~/plugins/oruga.ts" }],
  buildModules: ["@nuxtjs/tailwindcss"],
});
