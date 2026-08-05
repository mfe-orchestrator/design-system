import * as React from "react"
import { Button } from "../atoms/button/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog"

interface DeleteConfirmationDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onDelete: () => Promise<void> | void
    onDeleteSuccess?: () => void
    onCancel?: () => void
    title?: string
    description?: string
    cancelLabel?: string
    deleteLabel?: string
    deletingLabel?: string
}

export function DeleteConfirmationDialog({
    isOpen,
    onOpenChange,
    onDelete,
    onDeleteSuccess,
    onCancel,
    title = "Delete Confirmation",
    description = "Are you sure you want to delete",
    cancelLabel = "Cancel",
    deleteLabel = "Delete",
    deletingLabel = "Deleting..."
}: DeleteConfirmationDialogProps) {
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await onDelete()
            onOpenChange(false)
            onDeleteSuccess?.()
        } finally {
            setIsDeleting(false)
        }
    }

    const handleCancel = () => {
        onCancel?.()
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <p>{description}</p>
                <DialogFooter>
                    <Button variant="secondary" onClick={handleCancel} disabled={isDeleting}>
                        {cancelLabel}
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? deletingLabel : deleteLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
