import clsx from "clsx"
import { X } from "lucide-react"
import type { InputHTMLAttributes } from "react"
import { Controller, type FieldError, type FieldValues, type Path, type RegisterOptions, useFormContext } from "react-hook-form"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { SelectContent } from "../ui/select/partials/selectContent/selectContent"
import { SelectControl } from "../ui/select/partials/selectControl/selectControl"
import { SelectItem } from "../ui/select/partials/selectItem/selectItem"
import { SelectTrigger } from "../ui/select/partials/selectTrigger/selectTrigger"
import { Select, SelectValue } from "../ui/select/select"

type SelectFieldProps<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> &
    TestIdProps & {
        name: Path<T>
        label?: string
        rules?: Omit<RegisterOptions<T, string & Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
        options: { value: string; label: string; icon?: string }[]
        containerClassName?: string
        addClearButton?: boolean
        onValueChange?: (value: string) => void
        /** Testo di aiuto associato al campo tramite aria-describedby */
        description?: string
        /** Nome accessibile del bottone che azzera la selezione */
        clearLabel?: string
        /** Messaggio mostrato quando non ci sono opzioni */
        noOptionsLabel?: string
        /** Testo annunciato dagli screen reader per il marcatore di campo obbligatorio */
        requiredLabel?: string
    }

const SelectField = <T extends FieldValues>({
    name,
    label,
    rules,
    className,
    containerClassName,
    id,
    options = [],
    placeholder,
    addClearButton,
    onValueChange,
    dataTestId,
    description,
    clearLabel = "Clear selection",
    noOptionsLabel = "No options available",
    requiredLabel = "required",
    disabled,
    ...props
}: SelectFieldProps<T>) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<T>()

    const error = errors[name] as FieldError | undefined
    const inputId = id || name
    const testId = getTestId({ dataTestId, id, name })
    const isRequired = props.required || !!rules?.required

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, formState }) => {
                const selectedOption = options.find(option => option.value === field.value)

                return (
                    <SelectControl
                        id={inputId}
                        label={label}
                        // L'etichetta segue lo stato di errore anche quando il messaggio manca,
                        // perché `SelectControl` colora in base al testo dell'errore, non alla sua presenza.
                        labelClassName={error ? "text-destructive" : undefined}
                        description={description}
                        error={error?.message}
                        required={isRequired}
                        requiredLabel={requiredLabel}
                        className={containerClassName}
                    >
                        {/* Il bottone di reset è fratello (e non figlio) del trigger: un bottone
                            annidato in un altro bottone non è markup valido né accessibile. */}
                        <div className="relative">
                            <Select
                                value={field.value || ""}
                                onValueChange={value => {
                                    field.onChange(value)
                                    onValueChange?.(value)
                                }}
                                disabled={disabled || formState.isSubmitting}
                                name={name}
                            >
                                <SelectTrigger
                                    id={inputId}
                                    aria-invalid={!!error}
                                    aria-required={isRequired || undefined}
                                    dataTestId={testId}
                                    className={clsx(addClearButton && field.value && "pr-14", error && "border-destructive focus-visible:ring-destructive", className)}
                                >
                                    <SelectValue placeholder={placeholder}>
                                        {field.value ? (
                                            <span className="flex items-center gap-2">
                                                {selectedOption?.icon && <img src={selectedOption.icon} alt="" className="w-4 h-4" />}
                                                {selectedOption?.label}
                                            </span>
                                        ) : (
                                            placeholder
                                        )}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {options.length > 0 ? (
                                        options.map(option => (
                                            <SelectItem key={option.value} value={option.value} dataTestId={testId ? `${testId}-option-${option.value}` : undefined}>
                                                <span className="flex items-center gap-2">
                                                    {option.icon && <img src={option.icon} alt="" className="w-4 h-4" />}
                                                    {option.label}
                                                </span>
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <span className="text-sm text-foreground-secondary px-2">{noOptionsLabel}</span>
                                    )}
                                </SelectContent>
                            </Select>
                            {addClearButton && field.value && (
                                <button
                                    type="button"
                                    aria-label={clearLabel}
                                    data-testid={testId ? `${testId}-clear` : undefined}
                                    disabled={disabled || formState.isSubmitting}
                                    onClick={() => {
                                        field.onChange("")
                                        onValueChange?.("")
                                    }}
                                    className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-sm transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                                >
                                    <X className="w-3 h-3 text-muted-foreground hover:text-foreground" aria-hidden="true" focusable="false" />
                                </button>
                            )}
                        </div>
                    </SelectControl>
                )
            }}
        />
    )
}

export default SelectField
