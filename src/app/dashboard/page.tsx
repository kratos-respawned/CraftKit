import { Navbar } from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardDialog from "./DashboardDialog";
import { Suspense } from "react";
import DashboardFallback from "@/components/Suspense/DashboardFallback";
import DashboardCards from "@/components/Dashboard";
export const dynamic = "force-dynamic";
const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

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
        <Suspense fallback={<DashboardFallback />}>
          <DashboardCards />
        </Suspense>
      </main>
    </>
  );
};

export default Dashboard;
