import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const resume = defineCollection({
  loader: glob({ pattern: "**/resume.json", base: "./src/data" }),
  schema: z.object({
    work: z.object({
      label: z.string(),
      description: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          meta: z.string(),
          intro: z.string(),
          details: z.string(),
          skills: z.array(z.string()).optional(),
        }),
      ),
    }),
    projects: z.object({
      label: z.string(),
      description: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          meta: z.string(),
          category: z.string(),
          github: z.string(),
          intro: z.string(),
          details: z.string().optional(),
        }),
      ),
    }),
    research: z.object({
      label: z.string(),
      description: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          meta: z.string(),
          github: z.string(),
          intro: z.string(),
          details: z.string().optional(),
        }),
      ),
    }),
    education: z.object({
      label: z.string(),
      description: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          meta: z.string(),
          intro: z.string(),
        }),
      ),
    }),
  }),
});

export const collections = { resume };
