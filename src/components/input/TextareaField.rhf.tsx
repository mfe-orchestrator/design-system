import clsx from "clsx"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Controller, FieldError, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { Textarea } from "../ui/textarea"

type TextFieldProps<T extends FieldValues> = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    TestIdProps & {
        name: Path<T>
        label: string
        rules?: Omit<RegisterOptions<T, string & Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
        textTransform?: (value: string) => string
        containerClassName?: string
        /** Testo di aiuto associato al campo tramite aria-describedby */
        description?: string
        /** Maschera il contenuto e mostra il toggle di visibilità (per segreti multi-riga) */
        secret?: boolean
        /** Etichetta accessibile del toggle quando il valore è nascosto */
        showValueLabel?: string
        /** Etichetta accessibile del toggle quando il valore è visibile */
        hideValueLabel?: string
        /** Testo annunciato dagli screen reader per il marcatore di campo obbligatorio */
        requiredLabel?: string
    }

const TextareaField = <T extends FieldValues>({
    name,
    label,
    rules,
    className,
    id,
    containerClassName,
    textTransform,
    disabled,
    dataTestId,
    description,
    secret,
    showValueLabel = "Show value",
    hideValueLabel = "Hide value",
    requiredLabel = "required",
    ...props
}: TextFieldProps<T>) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<T>()
    const [isValueVisible, setIsValueVisible] = useState(false)

    const error = errors[name] as FieldError | undefined
    const inputId = id || name
    const errorId = `${inputId}-error`
    const descriptionId = `${inputId}-description`
    const testId = getTestId({ dataTestId, id, name })
    const isMasked = secret && !isValueVisible
    const isRequired = props.required || !!rules?.required
    const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, formState }) => (
                <div className={clsx(`flex flex-col gap-1`, containerClassName)}>
                    <Label htmlFor={inputId} className={error ? "text-destructive" : "text-foreground-secondary"}>
                        {label}
                        {isRequired && (
                            <>
                                <span className="text-destructive ml-1" aria-hidden="true">
                                    *
                                </span>
                                <span className="sr-only"> ({requiredLabel})</span>
                            </>
                        )}
                    </Label>
                    {description && (
                        <p id={descriptionId} className="text-sm text-foreground-secondary">
                            {description}
                        </p>
                    )}
                    <div className={secret ? "relative" : undefined}>
                        <Textarea
                            disabled={disabled || formState.isSubmitting}
                            aria-invalid={!!error}
                            aria-describedby={describedBy}
                            aria-required={isRequired || undefined}
                            id={inputId}
                            className={clsx(className, error && "border-destructive focus-visible:ring-destructive", secret && "pr-10", isMasked && "[-webkit-text-security:disc]")}
                            {...field}
                            {...props}
                            onChange={e => {
                                field.onChange(textTransform ? textTransform(e.target.value) : e.target.value)
                                props.onChange?.(e)
                            }}
                            value={field.value || ""}
                            dataTestId={testId}
                        />
                        {secret && (
                            <button
                                type="button"
                                tabIndex={-1}
                                aria-label={isValueVisible ? hideValueLabel : showValueLabel}
                                aria-pressed={isValueVisible}
                                aria-controls={inputId}
                                data-testid={`${testId}-toggle-visibility`}
                                onClick={() => setIsValueVisible(visible => !visible)}
                                className="absolute right-3 top-3 rounded-sm text-foreground-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                            >
                                {isValueVisible ? <EyeOff className="h-4 w-4" aria-hidden="true" focusable="false" /> : <Eye className="h-4 w-4" aria-hidden="true" focusable="false" />}
                            </button>
                        )}
                    </div>
                    {error && (
                        <p id={errorId} role="alert" className="text-sm font-medium text-destructive">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    )
}

export default TextareaField
