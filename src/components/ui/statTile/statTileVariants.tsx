import { cva } from "class-variance-authority"

export const statTileVariants = cva("flex h-full flex-col gap-2 p-4")

/** Alla misura grande l'etichetta è lontana dal numero: un filo la tiene attaccata a ciò che descrive */
export const statTileHeaderVariants = cva("flex items-center gap-2", {
    variants: {
        size: {
            sm: "",
            lg: "border-b border-divider pb-2"
        }
    },
    defaultVariants: {
        size: "sm"
    }
})

export const statTileLabelVariants = cva("", {
    variants: {
        size: {
            sm: "text-sm text-foreground-secondary",
            lg: "text-base font-medium text-foreground"
        }
    },
    defaultVariants: {
        size: "sm"
    }
})

export const statTileValueVariants = cva("font-bold text-foreground", {
    variants: {
        /** L'unica vera differenza fra le due misure: il salto di scala del numero */
        size: {
            sm: "text-2xl",
            lg: "mt-3 text-center text-5xl"
        }
    },
    defaultVariants: {
        size: "sm"
    }
})
