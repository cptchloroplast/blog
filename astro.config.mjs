import EnvironmentPlugin from "vite-plugin-environment";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ben.okkema.org",
  server: {
    port: 5000
  },
  integrations: [svelte()],
  vite: {
    plugins: [EnvironmentPlugin(["CF_PAGES_COMMIT_SHA", "HCAPTCHA_SITEKEY"])]
  },
  markdown: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [['rehype-external-links', {
      target: "_blank",
      content: {
        type: "element",
        tagName: "i",
        properties: {
          className: ["i-external"]
        }
      },
      contentProperties: {
        style: "margin-left: 4px;"
      }
    }]]
  }
});