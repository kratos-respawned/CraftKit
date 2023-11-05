import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const data = await request.json();
  try {
    const id = data.id;

    const project = await db.project.findUnique({
      where: {
        id: id,
        user: {
          id: session.user.id,
        },
      },
    });

    return NextResponse.json({
      isOwner: !!project,
      html: project?.html,
      css: project?.css,
      js: project?.js,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
  }
}
