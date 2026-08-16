import { Check, Copy } from "lucide-react"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { Button } from "../button/Button"
import type { IButtonProps } from "../button/IButtonProps"

export interface ICopyButtonProps extends Omit<IButtonProps, "children" | "onCopy">, TestIdProps {
    /** Testo scritto negli appunti al click */
    value: string
    /** Nome accessibile del bottone, usato anche come tooltip nativo */
    label?: string
    /** Etichetta annunciata e mostrata subito dopo la copia */
    copiedLabel?: string
    /** Mostra l'etichetta accanto all'icona: senza, resta solo per gli screen reader */
    showLabel?: boolean
    /** Millisecondi prima che il bottone torni allo stato iniziale */
    resetAfterMs?: number
    onCopied?: (value: string) => void
}

/**
 * Bottone che copia un testo negli appunti e per qualche secondo mostra la spunta di conferma.
 *
 * La conferma viene annunciata da una live region: il solo cambio di `aria-label` non
 * verrebbe letto dagli screen reader mentre il focus è già sul bottone.
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, ICopyButtonProps>(
    (
        {
            value,
            label = "Copy",
            copiedLabel = "Copied",
            showLabel = false,
            resetAfterMs = 2000,
            onCopied,
            variant = "ghost",
            size = "icon-sm",
            className,
            disabled,
            type = "button",
            title,
            id,
            dataTestId,
            ...props
        },
        ref
    ) => {
        const [copied, setCopied] = React.useState(false)
        const resetTimeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
        const testId = getTestId({ dataTestId, id })

        // Senza il cleanup il timer chiamerebbe setState su un bottone già smontato.
        React.useEffect(() => () => clearTimeout(resetTimeout.current), [])

        const handleCopy = async () => {
            try {
                await navigator.clipboard?.writeText(value)
            } catch {
                // Appunti negati (permesso rifiutato o contesto non sicuro): niente conferma.
                return
            }

            setCopied(true)
            onCopied?.(value)
            clearTimeout(resetTimeout.current)
            resetTimeout.current = setTimeout(() => setCopied(false), resetAfterMs)
        }

        const currentLabel = copied ? copiedLabel : label

        return (
            <Button
                {...props}
                ref={ref}
                type={type}
                variant={variant}
                size={size}
                className={cn(className)}
                disabled={disabled}
                onClick={handleCopy}
                title={title ?? currentLabel}
                aria-label={showLabel ? undefined : currentLabel}
                id={id}
                dataTestId={testId}
            >
                {copied ? <Check /> : <Copy />}
                {showLabel && <span className="truncate">{currentLabel}</span>}
                <span className="sr-only" role="status" aria-live="polite">
                    {copied ? copiedLabel : ""}
                </span>
            </Button>
        )
    }
)

CopyButton.displayName = "CopyButton"

export default CopyButton
