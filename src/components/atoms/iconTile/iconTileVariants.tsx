import { cva } from "class-variance-authority"

export const iconTileVariants = cva("flex items-center justify-center", {
    variants: {
        shape: {
            circle: "rounded-full",
            /** Angoli smussati e non tondi: la tessera quadrata vive dentro card e griglie, dove il cerchio stona */
            square: "rounded-md"
        },
        tone: {
            primary: "bg-primary/15 text-primary",
            // `--accent` in tema chiaro e' un violetto quasi bianco: il glifo va tinto con
            // `accent-foreground`, altrimenti sparisce sullo sfondo della card.
            accent: "bg-accent text-accent-foreground",
            destructive: "bg-destructive/15 text-destructive",
            /** Icona smorzata, per i contenuti che non chiedono nessuna azione */
            muted: "bg-muted text-foreground-secondary"
        },
        /** Contenitore e glifo crescono insieme: separarli produrrebbe icone perse dentro tessere troppo grandi */
        size: {
            sm: "size-10 [&_svg]:size-5",
            md: "size-12 [&_svg]:size-5",
            lg: "size-16 [&_svg]:size-7",
            xl: "size-20 [&_svg]:size-8"
        }
    },
    defaultVariants: {
        shape: "circle",
        tone: "primary",
        size: "md"
    }
})
