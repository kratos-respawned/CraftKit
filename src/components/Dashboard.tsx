import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Icons } from "./Icons";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import DeleteButton from "./DeleteComponent";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const DashboardCards = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const projects = await db.project.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: true,
    },
  });
  return (
    <section className="w-full ">
      {projects.length === 0 && (
        <p className="text-lg ">
          You have no projects yet. Create one to get started!
        </p>
      )}
      <div className="grid max-[400px]:grid-cols-1 grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          return (
            <Card
              key={project.id}
              className="max-w-sm mx-auto overflow-hidden transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              <Image
                alt="Profile picture"
                className="object-cover w-full"
                height="320"
                src={project.ogLink!}
                style={{
                  aspectRatio: "320/320",
                  objectFit: "cover",
                }}
                width="320"
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold ">{project.name}</h2>
                  {project.usingTailwind ? (
                    <Icons.tailwind className="w-10 h-10" />
                  ) : (
                    <Icons.css className="w-10 h-10" />
                  )}
                </div>

                <div className="flex mt-4 space-x-2">
                  <Link
                    href={`/editor/${project.id}`}
                    className={buttonVariants({
                      size: "sm",
                      className:
                        "w-full transition-all duration-200 hover:bg-gray-700 hover:text-white",
                    })}
                  >
                    Open
                  </Link>
                  <DeleteButton id={project.id} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardCards;
