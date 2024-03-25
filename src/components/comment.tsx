"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "@clerk/nextjs";
import { MessageCircleMoreIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./submit-button";
import { createCommentAction } from "@/actions/comments-actions";

export default function Comment({ productId }: { productId: number }) {
  const [openDialog, setOpenDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isSignedIn } = useSession();

  const handleDialogClick = () => {
    if (!isSignedIn) {
      toast.info("Inicia sesión para comentar el tocado.", {
        style: { background: "#eff8ff", color: "blue", borderColor: "#d3e0fd" },
      });
    } else {
      setOpenDialog(true);
    }
  };

  const handleTextareaHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "0px";
      const scrollHeight = el.scrollHeight;
      el.style.height = scrollHeight + "px";
    }
  };

  const createComment = async (formData: FormData) => {
    const message = formData.get("message") as string;

    const result = await createCommentAction({ productId, message });

    if (result.error) {
      toast.error(result.error, {
        style: { background: "#fff0f0", color: "red" },
      });
    } else if (result.success) {
      toast.success(result.success, {
        style: { background: "#ecfdf3", color: "green" },
      });
      setOpenDialog(false);
    } else {
      toast.info(result.info, {
        style: {
          background: "#eff8ff",
          color: "blue",
          borderColor: "#d3e0fd",
        },
      });
    }
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={() => {
        if (openDialog) setOpenDialog(false);
      }}
    >
      <DialogTrigger
        title="Comentar tocado"
        className="absolute left-4 top-2"
        onClick={handleDialogClick}
      >
        <MessageCircleMoreIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>¿Qué piensas sobre éste tocado?</DialogTitle>
        </DialogHeader>
        <form action={createComment} className="flex flex-col gap-4">
          <fieldset className="space-y-2">
            <label htmlFor="product-message">Comentario</label>
            <Textarea
              ref={textareaRef}
              id="product-message"
              name="message"
              onChange={handleTextareaHeight}
              className="resize-none"
            />
          </fieldset>
          <SubmitButton loadingText="Comentando..." text="Comentar" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
