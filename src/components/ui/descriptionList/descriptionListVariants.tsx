import { cva } from "class-variance-authority"

export const descriptionListVariants = cva("flex flex-col", {
    variants: {
        orientation: {
            /** Etichetta sopra al valore: per i riquadri di dettaglio, dove il valore può andare a capo */
            stacked: "gap-4",
            /** Etichetta e valore sulla stessa riga: per gli elenchi fitti dentro una card */
            inline: "gap-1.5 text-sm"
        }
    },
    defaultVariants: {
        orientation: "stacked"
    }
})

export const descriptionItemVariants = cva("min-w-0", {
    variants: {
        orientation: {
            stacked: "flex flex-col gap-1",
            // `items-start` e non `items-center`: quando il valore occupa più righe
            // l'etichetta deve restare allineata alla prima, non centrarsi sul blocco.
            inline: "flex flex-wrap items-start gap-x-2 gap-y-0.5"
        }
    },
    defaultVariants: {
        orientation: "stacked"
    }
})

export const descriptionTermVariants = cva("text-foreground-secondary", {
    variants: {
        orientation: {
            stacked: "text-sm",
            inline: "font-medium"
        }
    },
    defaultVariants: {
        orientation: "stacked"
    }
})

export const descriptionDetailVariants = cva("min-w-0 max-w-full break-words text-foreground", {
    variants: {
        orientation: {
            stacked: "",
            inline: "hyphens-auto"
        }
    },
    defaultVariants: {
        orientation: "stacked"
    }
})
