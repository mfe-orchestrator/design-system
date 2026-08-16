import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

type SelectControlContextValue = {
    /** id da applicare al trigger: è il bersaglio dell'`htmlFor` dell'etichetta */
    controlId?: string
    labelId?: string
    describedBy?: string
}

const SelectControlContext = React.createContext<SelectControlContextValue>({})

export interface ISelectControlProps extends React.HTMLAttributes<HTMLDivElement>, TestIdProps {
    label?: React.ReactNode
    labelClassName?: string
    /** Testo di aiuto sotto l'etichetta, collegato al trigger con `aria-describedby` */
    description?: React.ReactNode
    /** Messaggio di errore: colora l'etichetta e viene annunciato come alert */
    error?: React.ReactNode
    required?: boolean
    /** Testo annunciato dagli screen reader per il marcatore di campo obbligatorio */
    requiredLabel?: string
    /** id del controllo: se manca ne viene generato uno, perché senza id l'etichetta non può essere associata */
    id?: string
}

/**
 * Etichetta un `Select` fuori da react-hook-form.
 *
 * L'associazione fra etichetta e trigger passa dal contesto e non dalla composizione manuale:
 * il trigger è nipote di questo wrapper (sta dentro `Select`) e non potrebbe ricevere l'id per props
 * senza obbligare ogni chiamante a inventarselo, che è il motivo per cui finora le etichette erano
 * `<span>` scollegati dal controllo.
 */
export const SelectControl: React.FC<ISelectControlProps> = ({
    label,
    labelClassName,
    description,
    error,
    required = false,
    requiredLabel = "required",
    id,
    className,
    children,
    dataTestId,
    ...props
}) => {
    const generatedId = React.useId()
    const controlId = id ?? generatedId
    const labelId = `${controlId}-label`
    const descriptionId = `${controlId}-description`
    const errorId = `${controlId}-error`
    const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined

    const contextValue = React.useMemo(() => ({ controlId, labelId: label ? labelId : undefined, describedBy }), [controlId, labelId, label, describedBy])

    return (
        <SelectControlContext.Provider value={contextValue}>
            {/* `id` non entra nel data-testid: appartiene al trigger, e riusarlo qui darebbe due nodi con lo stesso testid */}
            <div {...props} className={cn("grid gap-1", className)} data-testid={getTestId({ dataTestId, ...props })}>
                {label && (
                    <Label id={labelId} htmlFor={controlId} className={cn(error && "text-destructive", labelClassName)}>
                        {label}
                        {required && (
                            <>
                                <span className="text-destructive ml-1" aria-hidden="true">
                                    *
                                </span>
                                <span className="sr-only"> ({requiredLabel})</span>
                            </>
                        )}
                    </Label>
                )}
                {description && (
                    <p id={descriptionId} className="text-sm text-foreground-secondary">
                        {description}
                    </p>
                )}
                {children}
                {error && (
                    <p id={errorId} role="alert" className="text-sm font-medium text-destructive">
                        {error}
                    </p>
                )}
            </div>
        </SelectControlContext.Provider>
    )
}

SelectControl.displayName = "SelectControl"

export { SelectControlContext }

export default SelectControl
