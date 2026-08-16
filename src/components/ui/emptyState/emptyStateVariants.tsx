import { cva } from "class-variance-authority"

export const emptyStateVariants = cva("flex flex-col items-center justify-center text-center", {
    variants: {
        variant: {
            /** Contenuto nudo, da mettere dentro una Card o una tabella già bordata */
            plain: "",
            /** Riquadro tratteggiato autonomo, per le griglie senza contenitore */
            outlined: "rounded-lg border-2 border-dashed border-divider bg-card"
        },
        /** La spaziatura verticale è l'unica cosa che distingue un vuoto denso da uno a piena pagina */
        size: {
            sm: "gap-2 px-6 py-8",
            default: "gap-4 px-6 py-12",
            lg: "gap-4 px-6 py-16"
        }
    },
    defaultVariants: {
        variant: "plain",
        size: "default"
    }
})

/**
 * La scala dei vuoti (sm/default/lg) è più corta di quella di `IconTile`, che deve coprire anche
 * le tessere piccole delle liste: la corrispondenza è esplicita perché i nomi non coincidono.
 */
export const emptyStateIconTileSize = {
    sm: "md",
    default: "lg",
    lg: "xl"
} as const

/** Icona senza cerchio: resta solo il colore, la dimensione la porta il glifo */
export const emptyStateBareIconVariants = cva("", {
    variants: {
        tone: {
            primary: "text-primary",
            accent: "text-accent-foreground",
            destructive: "text-destructive",
            muted: "text-foreground-secondary"
        },
        size: {
            sm: "[&_svg]:size-8",
            default: "[&_svg]:size-10",
            lg: "[&_svg]:size-12"
        }
    },
    defaultVariants: {
        tone: "muted",
        size: "default"
    }
})

export const emptyStateTitleVariants = cva("text-foreground", {
    variants: {
        size: {
            sm: "text-sm font-medium",
            default: "text-lg font-semibold",
            lg: "text-lg font-semibold"
        }
    },
    defaultVariants: {
        size: "default"
    }
})

export const emptyStateDescriptionVariants = cva("text-foreground-secondary", {
    variants: {
        size: {
            // Anche il vuoto compatto resta a text-sm: sotto questa soglia il messaggio
            // che spiega perche' la lista e' vuota diventa il testo piu' piccolo della pagina.
            sm: "text-sm",
            default: "text-sm",
            lg: "mx-auto max-w-md text-sm"
        }
    },
    defaultVariants: {
        size: "default"
    }
})
