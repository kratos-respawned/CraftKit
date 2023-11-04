import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardDialog from "./DashboardDialog";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <main className="flex flex-col px-4 pt-32 md:px-20 lg:flex-row gap-x-36 gap-y-5">
      <Navbar />
      <div className="flex items-center justify-between w-full max-sm:flex-col">
        <h1 className="text-3xl font-cal">Your Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Component</Button>
          </DialogTrigger>
          <DashboardDialog />
        </Dialog>
      </div>
    </main>
  );
};

export default Dashboard;
