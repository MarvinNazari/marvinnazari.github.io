import type { APIRoute } from "astro";
import library from "../../../public/cadence/exercises.json";

// Cadence's exercise library one per line, small enough for a language
// model's prompt: what a planned session needs from each exercise. Built
// from exercises.json, so a library publish updates it too. Whole runs,
// rides and swims (endurance) are left out, as the app's picker does.

type Exercise = {
  id: string;
  name: string;
  category?: string;
  measure: string;
  per_side?: boolean;
  implements?: number;
};

const exercises = (library.exercises as Exercise[]).filter((exercise) => exercise.category !== "endurance");

const lines = exercises.map((exercise) =>
  [
    exercise.id,
    exercise.name,
    exercise.category ?? "",
    exercise.measure,
    [exercise.per_side ? "per_side" : null, (exercise.implements ?? 1) > 1 ? `implements=${exercise.implements}` : null]
      .filter(Boolean)
      .join(" "),
  ].join("\t"),
);

const text = [
  `# Cadence exercise library, ${library.generated}: ${exercises.length} exercises.`,
  "# For writing Cadence strength workouts: https://wavio.co/cadence/strength-format/",
  "# Tab-separated: id, name, category, measure, and per_side or implements=2 where they apply.",
  `# ${library.licence}`,
  "# Full entries (how-tos, muscles, equipment, alternatives): https://wavio.co/cadence/exercises.json",
  ...lines,
].join("\n");

export const GET: APIRoute = () => {
  return new Response(`${text}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
