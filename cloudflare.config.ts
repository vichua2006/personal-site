import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "personal-site",
    compatibilityDate: "2026-09-29",
    domains: ["victor-huang.ca", "www.victor-huang.ca"],
    workersDev: true,
    previewUrls: false,
    assets: {
      htmlHandling: "drop-trailing-slash",
      notFoundHandling: "404-page",
    },
  },
});
