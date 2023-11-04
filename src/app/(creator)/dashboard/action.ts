import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export const createProject = async () => {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const { user } = session;
  const project = await db.project.create({
    data: {
      name: "New Project",
      user: {
        connect: {
          id: user.id,
        },
      },
      description: "",
    },
  });
};
