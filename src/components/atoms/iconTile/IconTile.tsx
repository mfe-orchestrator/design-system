import type { VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { iconTileVariants } from "./iconTileVariants"

export type IconTileTone = NonNullable<VariantProps<typeof iconTileVariants>["tone"]>
export type IconTileSize = NonNullable<VariantProps<typeof iconTileVariants>["size"]>
export type IconTileShape = NonNullable<VariantProps<typeof iconTileVariants>["shape"]>

export interface IIconTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof iconTileVariants>, TestIdProps {
    /** Icona già istanziata, es. `<PackageOpen />`: la misura la impone la tessera, non il glifo */
    icon: React.ReactNode
    id?: string
}

/**
 * Icona dentro un contenitore colorato, tondo o quadrato.
 *
 * Senza `aria-label` la tessera è decorazione pura — l'informazione sta nel testo accanto — e viene
 * nascosta agli screen reader; con `aria-label` diventa un'immagine con un nome accessibile.
 */
export const IconTile: React.FC<IIconTileProps> = ({ icon, shape, tone, size, className, id, dataTestId, "aria-label": ariaLabel, ...props }) => {
    return (
        <div
            {...props}
            id={id}
            className={cn(iconTileVariants({ shape, tone, size }), className)}
            role={ariaLabel ? "img" : undefined}
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : "true"}
            data-testid={getTestId({ dataTestId, id })}
        >
            {icon}
        </div>
    )
}

IconTile.displayName = "IconTile"

export default IconTile
