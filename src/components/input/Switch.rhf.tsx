import type { SwitchProps } from "@radix-ui/react-switch"
import { Controller, type FieldError, type FieldValues, type Path, type RegisterOptions, useFormContext } from "react-hook-form"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { Label } from "../ui/label"
import { Switch as UISwitch } from "../ui/switch"

type SwitchCustomProps<T extends FieldValues> = SwitchProps &
    TestIdProps & {
        name: Path<T>
        label?: string
        rules?: Omit<RegisterOptions<T, string & Path<T>>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate">
        /** Testo di aiuto associato al campo tramite aria-describedby */
        description?: string
        /** Testo annunciato dagli screen reader per il marcatore di campo obbligatorio */
        requiredLabel?: string
    }

const Switch = <T extends FieldValues>({ id, name, label, rules, required, className, dataTestId, description, requiredLabel = "required", disabled, ...otherProps }: SwitchCustomProps<T>) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<T>()

    const error = errors[name] as FieldError | undefined
    const inputId = id || name
    const errorId = `${inputId}-error`
    const descriptionId = `${inputId}-description`
    const isRequired = required || !!rules?.required
    const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, formState }) => (
                <div className="grid gap-1">
                    {label && (
                        <Label htmlFor={inputId} className={error ? "text-destructive" : ""}>
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
                    )}
                    {description && (
                        <p id={descriptionId} className="text-sm text-foreground-secondary">
                            {description}
                        </p>
                    )}
                    <UISwitch
                        {...otherProps}
                        disabled={disabled || formState.isSubmitting}
                        id={inputId}
                        name={field.name}
                        ref={field.ref}
                        required={isRequired}
                        aria-invalid={!!error}
                        aria-describedby={describedBy}
                        checked={!!field.value}
                        onCheckedChange={checked => field.onChange(checked)}
                        onBlur={field.onBlur}
                        className={`${className || ""} ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        dataTestId={getTestId({ dataTestId, id, name })}
                    />
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

export default Switch
