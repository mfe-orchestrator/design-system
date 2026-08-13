import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

const Dialog = DialogPrimitive.Root

const DialogPortal = DialogPrimitive.Portal

const DialogTrigger = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> & TestIdProps>(
    ({ dataTestId, ...props }, ref) => <DialogPrimitive.Trigger ref={ref} {...props} data-testid={getTestId({ dataTestId, ...props })} />
)
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName

const DialogClose = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Close>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & TestIdProps>(({ dataTestId, ...props }, ref) => (
    <DialogPrimitive.Close ref={ref} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
DialogClose.displayName = DialogPrimitive.Close.displayName

const DialogOverlay = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & TestIdProps>(
    ({ className, dataTestId, ...props }, ref) => (
        <DialogPrimitive.Overlay
            ref={ref}
            className={cn("fixed inset-0 z-50 bg-border/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
            {...props}
            data-testid={getTestId({ dataTestId, ...props })}
        />
    )
)
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    TestIdProps & {
        /** Nome accessibile del bottone di chiusura */
        closeLabel?: string
        /** Nasconde il bottone di chiusura in alto a destra */
        hideCloseButton?: boolean
    }

const DialogContent = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Content>, DialogContentProps>(
    ({ className, children, dataTestId, closeLabel = "Close", hideCloseButton = false, ...props }, ref) => (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    "fixed rounded-lg left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border-2 bg-background p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
                    className
                )}
                {...props}
                data-testid={getTestId({ dataTestId, ...props })}
            >
                {children}
                {!hideCloseButton && (
                    <DialogPrimitive.Close
                        aria-label={closeLabel}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground-secondary"
                    >
                        <X className="h-4 w-4" aria-hidden="true" focusable="false" />
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    )
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, dataTestId, ...props }: React.HTMLAttributes<HTMLDivElement> & TestIdProps) => (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, dataTestId, ...props }: React.HTMLAttributes<HTMLDivElement> & TestIdProps) => (
    <div className={cn("flex gap-2 flex-wrap justify-end items-center", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & TestIdProps>(
    ({ className, dataTestId, ...props }, ref) => (
        <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-normal", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
    )
)
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & TestIdProps>(
    ({ className, dataTestId, ...props }, ref) => (
        <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
    )
)
DialogDescription.displayName = DialogPrimitive.Description.displayName

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger }
