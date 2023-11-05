import { Navbar } from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardDialog from "./DashboardDialog";
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/Icons";
import DeleteButton from "@/components/DeleteComponent";
export const dynamic = "force-dynamic";
const Dashboard = async () => {
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
    <>
      <main className="px-4 pt-32 md:px-20 lg:flex-row gap-x-36 gap-y-5">
        <Navbar />
        <div className="flex items-center justify-between w-full pb-10 max-sm:flex-col">
          <h1 className="text-3xl font-cal">Your Projects</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create Component</Button>
            </DialogTrigger>
            <DashboardDialog />
          </Dialog>
        </div>
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
      </main>
    </>
  );
};

export default Dashboard;
