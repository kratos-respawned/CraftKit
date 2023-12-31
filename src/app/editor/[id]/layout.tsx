import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

interface layoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

const Layout: React.FC<layoutProps> = async ({ params, children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  if (!params.id) {
    console.log("no id");
    redirect("/");
  }
  const project = await db.project
    .findFirst({
      where: {
        id: params.id,
      },
    })
    .catch((err) => console.log(err));
  if (!project) {
    notFound();
  }
  //   if (project.isPublic === false) redirect("/login");
  return <>{children}</>;
};

export default Layout;
