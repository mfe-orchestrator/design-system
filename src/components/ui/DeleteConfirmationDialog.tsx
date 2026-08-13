import * as React from "react"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { Button } from "../atoms/button/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog"

interface DeleteConfirmationDialogProps extends TestIdProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onDelete: () => Promise<void> | void
    onDeleteSuccess?: () => void
    onCancel?: () => void
    id?: string
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
    id,
    dataTestId,
    title = "Delete Confirmation",
    description = "Are you sure you want to delete",
    cancelLabel = "Cancel",
    deleteLabel = "Delete",
    deletingLabel = "Deleting..."
}: DeleteConfirmationDialogProps) {
    const [isDeleting, setIsDeleting] = React.useState(false)
    const testId = getTestId({ dataTestId, id, name: "delete-confirmation-dialog" })

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
            <DialogContent id={id} dataTestId={testId} closeLabel={cancelLabel} aria-busy={isDeleting || undefined}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {/* DialogDescription viene collegato al dialog tramite aria-describedby */}
                <DialogDescription className="text-foreground">{description}</DialogDescription>
                <DialogFooter>
                    <Button variant="secondary" onClick={handleCancel} disabled={isDeleting} dataTestId={`${testId}-cancel`}>
                        {cancelLabel}
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} aria-busy={isDeleting || undefined} dataTestId={`${testId}-confirm`}>
                        {isDeleting ? deletingLabel : deleteLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
