"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { editorSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
export async function updateProject(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { message: "Unauthorized" };
  if (!formData) return { message: "No data" };
  const data = {
    id: formData.get("id"),
    og: formData.get("og"),
    html: formData.get("html"),
    css: formData.get("css"),
    js: formData.get("js"),
  };
  try {
    const safeData = editorSchema.parse(data);

    if (safeData.html === "")
      safeData.og = "https://generated.vusercontent.net/placeholder.svg";

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
        ogLink: safeData.og,
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

export const deleteComponent = async (prevAction: any, action: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const id = action.get("id");
  if (!id || id === null) {
    console.log("no id");
    return;
  }
  try {
    const project = await db.project.findFirst({
      where: {
        id: id.toString(),
        userId: session.user.id,
      },
    });
    if (!project) {
      console.log("no project");
      return;
    }
    if (project.userId !== session.user.id) {
      console.log("not owner");
      return;
    }
    await db.project.delete({
      where: {
        id: id.toString(),
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
