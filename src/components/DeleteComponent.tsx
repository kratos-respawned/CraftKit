"use client";
import { CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useFormState, useFormStatus } from "react-dom";
import { deleteComponent } from "@/app/dashboard/action";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(deleteComponent, {
    message: null,
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you Sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All your data will be deleted
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex items-center justify-between gap-5"
          action={formAction}
        >
          <Button
            type="submit"
            value={id}
            name="id"
            disabled={pending}
            variant={"destructive"}
            className="flex-1 px-3 "
          >
            {pending ? "Deleting..." : "Confirm"}
          </Button>
          <DialogClose asChild>
            <Button type="button" className="flex-1" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
