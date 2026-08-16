import type { VariantProps } from "class-variance-authority"
import type * as React from "react"
import { CopyButton } from "@/components/atoms/copyButton/CopyButton"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { copyableValueTextVariants, copyableValueVariants } from "./copyableValueVariants"

export interface ICopyableValueProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof copyableValueVariants>, TestIdProps {
    /** Valore mostrato e copiato: chiave, identificativo, url */
    value: string
    /** Toglie il bottone di copia lasciando la sola riga di lettura */
    copyable?: boolean
    copyLabel?: string
    copiedLabel?: string
    /**
     * `break` manda a capo dentro la parola, `truncate` taglia con i puntini.
     * Un identificativo lungo va spezzato, un url dentro una riga stretta va tagliato.
     */
    overflow?: "break" | "truncate"
    id?: string
}

/**
 * Riga che mostra un valore da copiare: identificativo di progetto, chiave API, url di clone.
 *
 * Il valore sta in un `<code>` con `select-all` perche' resti selezionabile con un clic
 * anche quando gli appunti non sono disponibili (contesto non sicuro o permesso negato).
 */
export const CopyableValue: React.FC<ICopyableValueProps> = ({ value, copyable = true, copyLabel = "Copy", copiedLabel = "Copied", overflow = "break", size, className, id, dataTestId, ...props }) => {
    const testId = getTestId({ dataTestId, id })

    return (
        <div {...props} className={cn(copyableValueVariants({ size }), className)}>
            <code id={id} className={copyableValueTextVariants({ size, overflow })} data-testid={testId} title={overflow === "truncate" ? value : undefined}>
                {value}
            </code>
            {copyable && <CopyButton value={value} label={copyLabel} copiedLabel={copiedLabel} className="shrink-0" dataTestId={testId && `${testId}-copy`} />}
        </div>
    )
}

CopyableValue.displayName = "CopyableValue"

export default CopyableValue
