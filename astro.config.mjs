import EnvironmentPlugin from "vite-plugin-environment"

/** @type {import('astro').AstroUserConfig} */
const config = {
  projectRoot: "./",
  src: "./src",
  pages: "./src/pages",
  dist: "./dist",
  public: "./public",
  buildOptions: {
    site: "https://ben.okkema.org",
    sitemap: true,
  },
  devOptions: {
    hostname: "localhost",
    port: 5000,
  },
  renderers: [
    "@astrojs/renderer-svelte",
  ],
  vite: {
    plugins: [
      EnvironmentPlugin(["CF_PAGES_COMMIT_SHA", "HCAPTCHA_SITEKEY"]),
    ]
  },
};

export default config
