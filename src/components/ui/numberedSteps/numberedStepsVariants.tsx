import { cva } from "class-variance-authority"

export const numberedStepMarkerVariants = cva("flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-medium", {
    variants: {
        /**
         * Solo token del tema: le versioni applicative usavano `bg-blue-100`/`bg-orange-100`,
         * tinte fisse che in tema scuro restano chiare e rendono il numero illeggibile.
         */
        tone: {
            primary: "bg-primary/15 text-primary",
            // `text-accent` da solo non basta: in questo tema `--accent` è già una tinta
            // di sfondo chiara, il colore leggibile sopra di essa è `--accent-foreground`.
            accent: "bg-accent text-accent-foreground"
        }
    },
    defaultVariants: {
        tone: "primary"
    }
})
