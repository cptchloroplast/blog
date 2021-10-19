export default {
  projectRoot: ".",
  pages: "./src/pages",
  dist: "./dist",
  public: "./public",
  buildOptions: {
    site: "https://ben.okkema.org",
    sitemap: true,
  },
  devOptions: {
    hostname: "localhost",
    port: 3000,
  },
  renderers: [
    "@astrojs/renderer-svelte",
  ],
};
