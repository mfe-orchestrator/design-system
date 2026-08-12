import clsx from "clsx"
import { X } from "lucide-react"
import { useState } from "react"
import { Controller, type FieldError, type FieldValues, type Path, type RegisterOptions, useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

type TextareaChipsFieldProps<T extends FieldValues> = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    TestIdProps & {
        name: Path<T>
        label: string
        rules?: Omit<RegisterOptions<T, string & Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
        textTransform?: (value: string) => string
        containerClassName?: string
        /** Testo di aiuto associato al campo tramite aria-describedby */
        description?: string
        /** Prefisso del nome accessibile del bottone di rimozione di ogni chip */
        removeChipLabel?: string
        /** Istruzioni d'uso lette dagli screen reader (associate tramite aria-describedby) */
        hint?: string
        /** Testo annunciato dagli screen reader per il marcatore di campo obbligatorio */
        requiredLabel?: string
    }

const TextareaChipsField = <T extends FieldValues>({
    name,
    label,
    rules,
    className,
    id,
    containerClassName,
    textTransform,
    dataTestId,
    description,
    removeChipLabel = "Remove",
    hint = "Press Enter or type a comma to add an entry. Press Backspace on the empty field to remove the last entry.",
    requiredLabel = "required",
    ...props
}: TextareaChipsFieldProps<T>) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<T>()

    const [inputValue, setInputValue] = useState("")
    const error = errors[name] as FieldError | undefined
    const inputId = id || name
    const errorId = `${inputId}-error`
    const descriptionId = `${inputId}-description`
    const hintId = `${inputId}-hint`
    const testId = getTestId({ dataTestId, id, name })
    const isRequired = props.required || !!rules?.required
    const describedBy = [hintId, description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(" ")

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, formState }) => {
                const chips: string[] = Array.isArray(field.value) ? field.value : []

                const addChip = (value: string) => {
                    const values = value
                        .split(",")
                        .map(v => v.trim())
                        .filter(v => v)
                    const newChips = values.filter(v => !chips.includes(v)).map(v => (textTransform ? textTransform(v) : v))

                    if (newChips.length > 0) {
                        field.onChange([...chips, ...newChips])
                    }
                    setInputValue("")
                }

                const removeChip = (index: number) => {
                    field.onChange(chips.filter((_, i) => i !== index))
                }

                const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        addChip(inputValue)
                    } else if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
                        removeChip(chips.length - 1)
                    }
                }

                return (
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
                        <div
                            className={clsx(
                                "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                                error && "border-destructive focus-within:ring-destructive"
                            )}
                        >
                            {chips.length > 0 && (
                                <ul className="flex flex-wrap gap-2 mb-2 list-none p-0" aria-label={label}>
                                    {chips.map((chip, index) => (
                                        <li key={chip} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                                            <span>{chip}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeChip(index)}
                                                disabled={formState.isSubmitting}
                                                aria-label={`${removeChipLabel} ${chip}`}
                                                data-testid={testId ? `${testId}-remove-${chip}` : undefined}
                                                className="hover:bg-primary/20 rounded-sm p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                                            >
                                                <X className="h-3 w-3" aria-hidden="true" focusable="false" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <textarea
                                disabled={formState.isSubmitting}
                                id={inputId}
                                name={name}
                                aria-invalid={!!error}
                                aria-describedby={describedBy}
                                aria-required={isRequired || undefined}
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onBlur={() => {
                                    if (inputValue.trim()) {
                                        addChip(inputValue)
                                    }
                                }}
                                rows={1}
                                {...props}
                                className={clsx(
                                    "flex min-h-[80px] w-full bg-transparent outline-none resize-none text-sm placeholder:text-foreground/45 focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                                    className
                                )}
                                data-testid={testId}
                            />
                        </div>
                        <p id={hintId} className="sr-only">
                            {hint}
                        </p>
                        {error && (
                            <p id={errorId} role="alert" className="text-sm font-medium text-destructive">
                                {error.message}
                            </p>
                        )}
                    </div>
                )
            }}
        />
    )
}

export default TextareaChipsField
