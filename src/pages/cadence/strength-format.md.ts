import type { APIRoute } from "astro";
import spec from "./_strength-format.md?raw";

// The strength format's page as plain Markdown, for language models and
// scripts: the same file the page renders, so the two never differ.
const markdown = `# Cadence strength format\n\n${spec.trim()}\n`;

export const GET: APIRoute = () => {
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
