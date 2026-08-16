import type { VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { meterFillVariants, meterTrackVariants } from "./meterVariants"

export interface IMeterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof meterTrackVariants>, TestIdProps {
    /** Valore corrente, nella stessa unità di `max` */
    value: number
    /** Fondo scala: 100 quando il valore è già una percentuale */
    max?: number
    /**
     * Nome accessibile della barra: è obbligatorio perché un `progressbar` senza etichetta
     * viene annunciato come una percentuale nuda, senza dire di cosa.
     */
    label: string
    /** Anima la variazione di larghezza: da spegnere nelle tabelle, dove molte barre insieme distraggono */
    animated?: boolean
    id?: string
}

/**
 * Barra di avanzamento sottile.
 *
 * Espone sempre `role="progressbar"` e le relative `aria-*`: l'accessibilità non è un'opzione
 * lasciata al punto di utilizzo, com'era nelle copie sparse nell'applicazione.
 */
export const Meter: React.FC<IMeterProps> = ({ value, max = 100, label, size, animated = true, className, id, dataTestId, ...props }) => {
    // Il fondo scala arriva dalle props e il valore dai dati remoti: si normalizzano entrambi perché
    // una percentuale fuori intervallo farebbe traboccare il riempimento oltre la traccia e, soprattutto,
    // farebbe annunciare agli screen reader un avanzamento impossibile (es. 140%).
    const safeMax = Number.isFinite(max) && max > 0 ? max : 100
    const clampedValue = Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), safeMax)
    const percentage = (clampedValue / safeMax) * 100

    return (
        <div
            {...props}
            id={id}
            className={cn(meterTrackVariants({ size }), className)}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={safeMax}
            aria-label={label}
            data-testid={getTestId({ dataTestId, id })}
        >
            <div className={meterFillVariants({ animated })} style={{ width: `${percentage}%` }} />
        </div>
    )
}

Meter.displayName = "Meter"

export default Meter
