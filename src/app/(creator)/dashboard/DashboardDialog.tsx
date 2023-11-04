"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const DashboardDialog = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Enter Details</DialogTitle>
        <DialogDescription>Click save to continue</DialogDescription>
      </DialogHeader>
      <form>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Shiny Button"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Description</Label>
            <Textarea placeholder="Enter Description." />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="airplane-mode">Are you using Tailwind CSS?</Label>
            <Switch id="Tailwind" />
          </div>
        </div>
      </form>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DashboardDialog;
