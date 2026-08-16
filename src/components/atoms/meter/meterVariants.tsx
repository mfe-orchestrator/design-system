import { cva } from "class-variance-authority"

export const meterTrackVariants = cva("w-full overflow-hidden rounded-full bg-primary/20", {
    variants: {
        size: {
            sm: "h-1",
            md: "h-1.5"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

export const meterFillVariants = cva("h-full rounded-full bg-primary", {
    variants: {
        animated: {
            /** `motion-reduce` spegne la transizione per chi ha chiesto meno movimento a livello di sistema */
            true: "transition-all duration-300 motion-reduce:transition-none",
            false: ""
        }
    },
    defaultVariants: {
        animated: true
    }
})
