export default {
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
};
