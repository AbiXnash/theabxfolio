import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const resume = defineCollection({
  loader: glob({ pattern: "resume.json", base: "./src/data" }),
  schema: z.object({
    work: z.object({
      items: z.array(
        z.object({
          title: z.string(),
          meta: z.string(),
          intro: z.string(),
          details: z.string(),
          skills: z.array(z.string()).optional(),
          category: z.string().optional(),
        }),
      ),
    }),
    projects: z.object({
      items: z.array(
        z.object({
          title: z.string(),
          meta: z.string(),
          category: z.string(),
          github: z.string(),
          links: z
            .array(
              z.object({
                label: z.string(),
                url: z.string(),
              }),
            )
            .optional(),
          intro: z.string(),
          details: z.string().optional(),
        }),
      ),
    }),
    publications: z.object({
      items: z.array(
        z.object({
          title: z.string(),
          authors: z.array(z.string()),
          venue: z.string(),
          year: z.number(),
          doi: z.string(),
          summary: z.string().optional(),
        }),
      ),
    }),
    education: z.object({
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