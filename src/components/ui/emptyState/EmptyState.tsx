import type { VariantProps } from "class-variance-authority"
import * as React from "react"
import { IconTile } from "@/components/atoms/iconTile"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { emptyStateBareIconVariants, emptyStateDescriptionVariants, emptyStateIconTileSize, emptyStateTitleVariants, emptyStateVariants } from "./emptyStateVariants"

type EmptyStateTone = NonNullable<VariantProps<typeof emptyStateBareIconVariants>["tone"]>

export interface IEmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof emptyStateVariants>, TestIdProps {
    /** Icona mostrata sopra al testo: si passa già istanziata, es. `<PackageOpen />` */
    icon?: React.ReactNode
    /** `circle` mette l'icona in un cerchio colorato, `bare` lascia il solo glifo */
    iconVariant?: "circle" | "bare"
    /** Colore dell'icona (e del cerchio che la contiene) */
    tone?: EmptyStateTone
    title?: React.ReactNode
    /**
     * Tag del titolo: va scelto in base ai titoli già presenti nella pagina,
     * perché un salto di livello rompe la navigazione per intestazioni.
     */
    titleAs?: "h2" | "h3" | "p"
    description?: React.ReactNode
    /** Azioni sotto al testo: uno o più `Button`, disposti in riga e mandati a capo se serve */
    actions?: React.ReactNode
    /** Occupa tutta l'altezza disponibile del contenitore flex che lo ospita */
    grow?: boolean
    id?: string
}

/**
 * Blocco mostrato al posto di una lista vuota: icona, titolo, spiegazione e azioni.
 *
 * Il titolo è una vera intestazione (configurabile con `titleAs`) e non un testo in grassetto,
 * così chi naviga per intestazioni capisce perché la pagina è vuota senza doverla scorrere.
 */
export const EmptyState: React.FC<IEmptyStateProps> = ({
    icon,
    iconVariant = "circle",
    tone,
    title,
    titleAs: TitleTag = "h2",
    description,
    actions,
    grow = false,
    variant,
    size,
    className,
    children,
    id,
    dataTestId,
    ...props
}) => {
    const testId = getTestId({ dataTestId, id })

    return (
        <div {...props} id={id} className={cn(emptyStateVariants({ variant, size }), grow && "grow", className)} data-testid={testId}>
            {icon &&
                (iconVariant === "circle" ? (
                    <IconTile icon={icon} tone={tone} size={emptyStateIconTileSize[size ?? "default"]} />
                ) : (
                    <span aria-hidden="true" className={emptyStateBareIconVariants({ tone, size })}>
                        {icon}
                    </span>
                ))}
            {(title || description) && (
                <div className="space-y-1">
                    {title && <TitleTag className={emptyStateTitleVariants({ size })}>{title}</TitleTag>}
                    {description && <p className={emptyStateDescriptionVariants({ size })}>{description}</p>}
                </div>
            )}
            {actions && <div className="flex flex-wrap items-center justify-center gap-2">{actions}</div>}
            {children}
        </div>
    )
}

EmptyState.displayName = "EmptyState"

export default EmptyState
