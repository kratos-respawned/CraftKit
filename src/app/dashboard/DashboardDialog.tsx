"use client";
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
import { useFormState, useFormStatus } from "react-dom";
import { projectSchema } from "@/lib/validations";
import { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
const DashboardDialog = () => {
  const router = useRouter();
  const projectCreator = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    if (!e.target.name.value || !e.target.description.value)
      return alert("Please fill all the fields.");
    const formData = {
      // @ts-ignore
      name: e.target.name.value,
      // @ts-ignore
      description: e.target.description.value,
      // @ts-ignore
      tailwind: e.target.tailwind.value === "on" ? true : false,
      // @ts-ignore
      isPublic: e.target.isPublic.value === "on" ? true : false,
    };
    try {
      const parsedData = projectSchema.parse(formData);
      const resp = await axios.post("/api/createProject", parsedData);
      // console.log(resp);
      if (resp.status === 200 && resp.data.id)
        router.push(`/editor/${resp.data.id}`);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);
      }
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Enter Details</DialogTitle>
        <DialogDescription>Click save to continue</DialogDescription>
      </DialogHeader>
      <form onSubmit={projectCreator}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue="Shiny Button"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" placeholder="Enter Description." />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <Label>Are you using Tailwind CSS?</Label>
            <Switch name="tailwind" id="tailwind" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <Label>Is this public?</Label>
            <Switch name="isPublic" id="public" />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            // disabled={pending}
            className="disabled:bg-red-500"
          >
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default DashboardDialog;
