import { cva } from "class-variance-authority"

export const colorSwatchVariants = cva("inline-block shrink-0 rounded-full border-2 border-border", {
    variants: {
        size: {
            sm: "size-4",
            md: "size-5",
            lg: "size-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
})
