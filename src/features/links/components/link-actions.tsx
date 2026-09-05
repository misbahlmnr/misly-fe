"use client";

import {
  BarChart3,
  Eye,
  EyeOff,
  MoreHorizontal,
  Pencil,
  QrCode,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardLinkPath } from "@/config/routes";
import { isProPlan } from "@/config/user";
import { EditLinkDialog } from "@/features/links/components/edit-link-dialog";
import { useDeleteLink } from "../hooks/use-delete-link";
import { useUpdateStatus } from "../hooks/use-update-status";

const triggerClass =
  "inline-flex items-center justify-center rounded-md bg-tertiary-fixed p-2 ink-border btn-hard-shadow-sm hover:bg-surface";

interface LinkActionsProps {
  slug: string;
  linkId: string;
  title: string;
  destinationUrl: string;
  isHidden: boolean;
}

export function LinkActions({
  slug,
  linkId,
  title,
  destinationUrl,
  isHidden,
}: LinkActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const deleteLink = useDeleteLink();
  const updateStatus = useUpdateStatus();

  function handleUpdateStatus() {
    const value: string = isHidden ? "active" : "hidden";
    updateStatus.mutate(
      { id: linkId, value },
      { onSuccess: () => setConfirmOpen(false) },
    );
  }

  function handleConfirmDelete() {
    deleteLink.mutate(linkId, {
      onSuccess: () => setConfirmOpen(false),
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger title="More" className={triggerClass}>
          <MoreHorizontal className="size-5" strokeWidth={2.25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" strokeWidth={2.25} />
            Edit
          </DropdownMenuItem>
          {isProPlan() ? (
            <DropdownMenuLink href={dashboardLinkPath(slug)}>
              <span className="flex flex-1 items-center gap-2">
                <BarChart3 className="size-4" strokeWidth={2.25} />
                Analytics
              </span>
              <span className="rounded-sm border border-on-surface bg-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-fixed">
                PRO
              </span>
            </DropdownMenuLink>
          ) : (
            <DropdownMenuItem disabled>
              <span className="flex flex-1 items-center gap-2">
                <BarChart3 className="size-4" strokeWidth={2.25} />
                Analytics
              </span>
              <span className="rounded-sm border border-on-surface bg-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-fixed">
                PRO
              </span>
            </DropdownMenuItem>
          )}
          {isProPlan() ? (
            <DropdownMenuItem>
              <span className="flex flex-1 items-center gap-2">
                <QrCode className="size-4" strokeWidth={2.25} />
                Get QR Code
              </span>
              <span className="rounded-sm border border-on-surface bg-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-fixed">
                PRO
              </span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem disabled>
              <span className="flex flex-1 items-center gap-2">
                <QrCode className="size-4" strokeWidth={2.25} />
                Get QR Code
              </span>
              <span className="rounded-sm border border-on-surface bg-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-fixed">
                PRO
              </span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleUpdateStatus}>
            {isHidden ? (
              <>
                <Eye className="size-4" strokeWidth={2.25} />
                Show Link
              </>
            ) : (
              <>
                <EyeOff className="size-4" strokeWidth={2.25} />
                Hide Link
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="size-4" strokeWidth={2.25} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditLinkDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        link={{ id: linkId, title, slug, destinationUrl }}
      />
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete link?"
        description={`"${title}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        isLoading={deleteLink.isPending}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
