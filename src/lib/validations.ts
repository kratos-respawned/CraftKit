import * as z from "zod";

export const ogImageSchema = z.object({
  heading: z.string(),
  type: z.string(),
  mode: z.enum(["light", "dark"]).default("dark"),
});

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  tailwind: z.boolean().default(false),
  isPublic: z.boolean().default(true),
});
export const editorSchema = z.object({
  html: z.string(),
  css: z.string(),
  js: z.string(),
  id: z.string(),
  og: z.string(),
});
