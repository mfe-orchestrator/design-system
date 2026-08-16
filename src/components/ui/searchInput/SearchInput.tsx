import { Search, X } from "lucide-react"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { Button } from "../../atoms/button/Button"
import { Input } from "../input/input"

export interface ISearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className">, TestIdProps {
    value: string
    onValueChange: (value: string) => void
    /** Senza questa callback il bottone di pulizia non viene mostrato e il campo non riserva lo spazio a destra */
    onClear?: () => void
    /** Nome accessibile del bottone di pulizia */
    clearLabel?: string
    /** Classe del contenitore posizionato: le classi di larghezza e di layout vanno qui, non sull'input */
    className?: string
    fullWidth?: boolean
}

/**
 * Campo di ricerca con icona a sinistra e pulizia opzionale a destra.
 *
 * `clearLabel` è una prop e non un testo fisso: nell'applicazione le due copie di questo
 * markup condividevano per errore la stessa chiave di traduzione, presa dalla pagina in cui
 * il blocco era stato scritto la prima volta.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, ISearchInputProps>(
    ({ value, onValueChange, onClear, clearLabel = "Clear search", className, fullWidth = true, id, dataTestId, ...props }, ref) => {
        const testId = getTestId({ dataTestId, id, ...props })
        const clearable = Boolean(onClear)

        return (
            <div className={cn("relative", fullWidth && "w-full", className)}>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-secondary" aria-hidden="true" />
                <Input
                    {...props}
                    ref={ref}
                    id={id}
                    value={value}
                    onChange={event => onValueChange(event.target.value)}
                    fullWidth={fullWidth}
                    className={cn("pl-9", clearable && "pr-9")}
                    dataTestId={testId}
                />
                {clearable && value.length > 0 && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={onClear}
                        aria-label={clearLabel}
                        // Il focus ring del Button (ring-4 con offset) deborderebbe dal bordo del campo:
                        // dentro l'input resta a ring-2 senza offset. Il grigio distingue la X dal testo digitato.
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm text-foreground-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-offset-0"
                        dataTestId={testId && `${testId}-clear`}
                    >
                        <X />
                    </Button>
                )}
            </div>
        )
    }
)

SearchInput.displayName = "SearchInput"

export default SearchInput
