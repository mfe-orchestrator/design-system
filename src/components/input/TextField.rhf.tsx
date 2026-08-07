import clsx from "clsx"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Controller, FieldError, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form"
import { Input, InputProps } from "@/components/ui/input/input"
import { Label } from "@/components/ui/label"

type TextFieldProps<T extends FieldValues> = InputProps & {
    name: Path<T>
    label: string
    rules?: Omit<RegisterOptions<T, string & Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
    textTransform?: (value: string) => string
    containerClassName?: string
    dataTestId?: string
    /** Etichetta accessibile del toggle quando il valore è nascosto */
    showValueLabel?: string
    /** Etichetta accessibile del toggle quando il valore è visibile */
    hideValueLabel?: string
}

const TextField = <T extends FieldValues>({
    name,
    label,
    rules,
    className,
    id,
    containerClassName,
    textTransform,
    disabled,
    dataTestId,
    type,
    fullWidth = true,
    showValueLabel = "Show value",
    hideValueLabel = "Hide value",
    ...props
}: TextFieldProps<T>) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<T>()
    const [isValueVisible, setIsValueVisible] = useState(false)

    const error = errors[name] as FieldError | undefined
    const inputId = id || name
    const isSecret = type === "password"
    const inputType = isSecret && isValueVisible ? "text" : type

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, formState }) => (
                <div className={clsx(`flex flex-col gap-1`, containerClassName)}>
                    <Label htmlFor={inputId} className={error ? "text-destructive" : "text-foreground-secondary"}>
                        {label}
                        {props.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    <div className={isSecret ? "relative" : undefined}>
                        <Input
                            disabled={disabled || formState.isSubmitting}
                            aria-label={label}
                            aria-invalid={!!error}
                            aria-disabled={disabled}
                            id={inputId}
                            data-testid={dataTestId || inputId}
                            type={inputType}
                            fullWidth={fullWidth}
                            className={`${className} ${error ? "border-destructive focus-visible:ring-destructive" : ""} ${isSecret ? "pr-10" : ""}`}
                            {...field}
                            {...props}
                            onChange={e => {
                                field.onChange(textTransform ? textTransform(e.target.value) : e.target.value)
                                props.onChange?.(e)
                            }}
                            value={field.value || ""}
                        />
                        {isSecret && (
                            <button
                                type="button"
                                tabIndex={-1}
                                aria-label={isValueVisible ? hideValueLabel : showValueLabel}
                                data-testid={`${dataTestId || inputId}-toggle-visibility`}
                                onClick={() => setIsValueVisible(visible => !visible)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground"
                            >
                                {isValueVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        )}
                    </div>
                    {error && <p className="text-sm font-medium text-destructive">{error.message}</p>}
                </div>
            )}
        />
    )
}

export default TextField
