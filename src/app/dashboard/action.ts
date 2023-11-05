"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { editorSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";

export async function updateProject(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { message: "Unauthorized" };
  if (!formData) return { message: "No data" };
  const data = {
    id: formData.get("id"),
    html: formData.get("html"),
    css: formData.get("css"),
    js: formData.get("js"),
  };
  try {
    const safeData = editorSchema.parse(data);

    const project = await db.project.findUnique({
      where: {
        id: safeData.id,
        user: {
          id: session.user.id,
        },
      },
    });
    if (!project) return { message: "Unauthorized" };
    const updatedProject = await db.project.update({
      where: {
        id: safeData.id,
      },
      data: {
        html: safeData.html,
        css: safeData.css,
        js: safeData.js,
      },
    });
    return { message: "Updated" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { message: error.issues };
    }
    return { message: "Failed to create" };
  }
}
