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

export const emptyStateIconVariants = cva("flex items-center justify-center rounded-full", {
    variants: {
        tone: {
            primary: "bg-primary/15 text-primary",
            accent: "bg-accent/15 text-accent",
            destructive: "bg-destructive/15 text-destructive",
            /** Icona smorzata, per i vuoti che non chiedono nessuna azione */
            muted: "bg-muted text-foreground-secondary"
        },
        size: {
            sm: "size-12 [&_svg]:size-5",
            default: "size-16 [&_svg]:size-7",
            lg: "size-20 [&_svg]:size-8"
        }
    },
    defaultVariants: {
        tone: "primary",
        size: "default"
    }
})

/** Icona senza cerchio: resta solo il colore, la dimensione la porta il glifo */
export const emptyStateBareIconVariants = cva("", {
    variants: {
        tone: {
            primary: "text-primary",
            accent: "text-accent",
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
