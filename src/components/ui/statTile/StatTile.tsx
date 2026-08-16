import type { VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/utils/styleUtils"
import { type TestIdProps } from "@/utils/testIdUtils"
import { Card } from "../card"
import { statTileHeaderVariants, statTileLabelVariants, statTileValueVariants, statTileVariants } from "./statTileVariants"

export interface IStatTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof statTileValueVariants>, TestIdProps {
    /** Cosa viene misurato, es. «Dipendenze non allineate» */
    label: React.ReactNode
    /**
     * Tag dell'etichetta: va scelto in base ai titoli già presenti nella pagina,
     * perché una griglia di intestazioni fuori scala rompe la navigazione per titoli.
     */
    labelAs?: "p" | "h3" | "h4"
    /** Il numero (o il testo breve) che la tessera mette in evidenza */
    value: React.ReactNode
    /** Icona già istanziata, mostrata accanto all'etichetta */
    icon?: React.ReactNode
    /** Azione in coda, allineata in basso a destra: di norma un `Button` con `variant="link"` */
    action?: React.ReactNode
    id?: string
}

/**
 * Tessera che mostra una singola metrica: etichetta, valore in evidenza e, se servono, icona e azione.
 *
 * Usa la `Card` del design system come contenitore, così le griglie di KPI hanno lo stesso bordo e
 * lo stesso fondo del resto delle superfici invece di reinventarli ogni volta.
 */
export const StatTile: React.FC<IStatTileProps> = ({ label, labelAs: LabelTag = "p", value, icon, action, size, className, id, dataTestId, ...props }) => {
    return (
        <Card {...props} id={id} className={cn(statTileVariants(), className)} dataTestId={dataTestId}>
            <div>
                <div className={statTileHeaderVariants({ size })}>
                    {icon && (
                        <span className="text-foreground [&>svg]:size-4" aria-hidden="true">
                            {icon}
                        </span>
                    )}
                    <LabelTag className={statTileLabelVariants({ size })}>{label}</LabelTag>
                </div>
                <p className={statTileValueVariants({ size })}>{value}</p>
            </div>
            {action && <div className="mt-auto flex justify-end">{action}</div>}
        </Card>
    )
}

StatTile.displayName = "StatTile"

export default StatTile
