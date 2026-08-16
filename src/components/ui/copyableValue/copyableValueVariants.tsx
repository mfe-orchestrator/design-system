import { cva } from "class-variance-authority"

export const copyableValueVariants = cva("flex items-center gap-2 rounded-md border-2 border-border bg-muted", {
    variants: {
        size: {
            default: "px-3 py-2",
            sm: "px-2 py-1"
        }
    },
    defaultVariants: {
        size: "default"
    }
})

export const copyableValueTextVariants = cva("flex-1 select-all font-mono text-foreground", {
    variants: {
        size: {
            default: "text-sm",
            sm: "text-xs"
        },
        overflow: {
            break: "break-all",
            truncate: "truncate"
        }
    },
    defaultVariants: {
        size: "default",
        overflow: "break"
    }
})
