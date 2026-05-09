import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
import fs from "node:fs";

const resume = defineCollection({
  loader: async () => {
    const data = JSON.parse(fs.readFileSync("./src/data/resume.json", "utf-8"));
    return [{ id: "main", ...data }];
  },
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
