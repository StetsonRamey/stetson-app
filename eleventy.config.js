import EleventyWebC from "@11ty/eleventy-plugin-webc";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { execSync } from "child_process";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyWebC, {
    components: "src/_includes/**/*.webc",
  });

  // Add Eleventy Image plugin
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [250, 500, 750, 1000, 1500, "auto"],
  });

  // Build Tailwind CSS before Eleventy builds (initial build)
  eleventyConfig.on("eleventy.before", () => {
    console.log("🎨 Building Tailwind CSS (initial build)...");
    execSync(
      "npx @tailwindcss/cli -i src/assets/css/styles.css -o _site/assets/css/styles.css",
      {
        stdio: "inherit",
      }
    );
    console.log("✅ Tailwind CSS build complete");
  });

  // Build Tailwind CSS before watch rebuilds
  eleventyConfig.on("eleventy.beforeWatch", (changedFiles) => {
    console.log("🎨 Building Tailwind CSS (watch rebuild)...", changedFiles);
    execSync(
      "npx @tailwindcss/cli -i src/assets/css/styles.css -o _site/assets/css/styles.css",
      {
        stdio: "inherit",
      }
    );
    console.log("✅ Tailwind CSS rebuild complete");
  });

  // Log when Eleventy finishes building
  eleventyConfig.on("eleventy.after", () => {
    console.log("🏗️ Eleventy build complete");
  });

  // Copy assets to output directory
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/*.pdf");

  // Watch files that should trigger rebuilds
  eleventyConfig.addWatchTarget("src/assets/css/**/*.css");
  eleventyConfig.addWatchTarget("src/**/*.webc");

  eleventyConfig.setWatchThrottleWaitTime(200);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
}
