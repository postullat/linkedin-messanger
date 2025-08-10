import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "../package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: "Chrome Linkedin extension with React + Vite",
  action: {
    default_popup: "index.html",
  },
  background: {
    service_worker: "src/scripts/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content.ts"],
      run_at: "document_start"
    }
  ],
  web_accessible_resources: [
    {
      resources: ["src/injected.js"],
      matches: ["<all_urls>"]
    }
  ],
  permissions: ["webRequest", "activeTab", "storage", "scripting"],
  host_permissions: ["<all_urls>"]
});
