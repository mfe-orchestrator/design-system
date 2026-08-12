import clsx from "clsx"
import { Controller, FieldError, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

type SliderFieldProps<T extends FieldValues> = TestIdProps & {
    name: Path<T>
    label: string
    id?: string
    rules?: Omit<RegisterOptions<T, string & Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
    min?: number
    max?: number
    step?: number
    /** Unita mostrata accanto al valore e agli estremi, es. "%" */
    unit?: string
    /** Valori suggeriti mostrati come scorciatoie sotto lo slider */
    presets?: number[]
    /** Nasconde il valore corrente accanto alla label */
    hideValue?: boolean
    /** Nasconde le etichette di minimo e massimo sotto lo slider */
    hideBounds?: boolean
    /** Formattazione del valore mostrato; per default `${value}${unit}` */
    formatValue?: (value: number) => string
    /** Etichetta accessibile del gruppo di scorciatoie */
    presetsLabel?: string
    /** Testo di aiuto associato al campo tramite aria-describedby */
    description?: string
    /** Testo annunciato dagli screen reader per il marcatore di campo obbligatorio */
    requiredLabel?: string
    required?: boolean
    disabled?: boolean
    className?: string
    containerClassName?: string
}

const SliderField = <T extends FieldValues>({
    name,
    label,
    id,
    rules,
    min = 0,
    max = 100,
    step = 1,
    unit = "",
    presets,
    hideValue = false,
    hideBounds = false,
    formatValue,
    presetsLabel,
    description,
    requiredLabel = "required",
    required,
    disabled,
    className,
    containerClassName,
    dataTestId
}: SliderFieldProps<T>) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<T>()

    const error = errors[name] as FieldError | undefined
    const inputId = id || name
    const errorId = `${inputId}-error`
    const descriptionId = `${inputId}-description`
    const testId = getTestId({ dataTestId, id, name })
    const isRequired = required || !!rules?.required
    const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined
    const format = formatValue ?? ((value: number) => `${value}${unit}`)

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, formState }) => {
                const value = typeof field.value === "number" ? field.value : min
                const isDisabled = disabled || formState.isSubmitting

                return (
                    <div className={clsx("flex flex-col gap-1", containerClassName)} data-testid={testId}>
                        <div className="flex items-baseline justify-between gap-2">
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
                            {!hideValue && (
                                <output
                                    htmlFor={inputId}
                                    // il valore è già annunciato dallo slider: evita il doppio annuncio
                                    aria-hidden="true"
                                    className={clsx("text-xl font-semibold tabular-nums", error ? "text-destructive" : "text-primary")}
                                    data-testid={`${testId}-value`}
                                >
                                    {format(value)}
                                </output>
                            )}
                        </div>

                        {description && (
                            <p id={descriptionId} className="text-sm text-foreground-secondary">
                                {description}
                            </p>
                        )}

                        <Slider
                            id={inputId}
                            thumbAriaLabel={label}
                            aria-invalid={!!error}
                            aria-describedby={describedBy}
                            aria-required={isRequired || undefined}
                            aria-valuetext={format(value)}
                            min={min}
                            max={max}
                            step={step}
                            disabled={isDisabled}
                            value={[value]}
                            onValueChange={([next]) => field.onChange(next)}
                            onBlur={field.onBlur}
                            className={className}
                            dataTestId={`${testId}-slider`}
                        />

                        {!hideBounds && (
                            <div className="flex justify-between text-xs text-foreground-secondary tabular-nums" aria-hidden="true">
                                <span>{format(min)}</span>
                                <span>{format(max)}</span>
                            </div>
                        )}

                        {presets && presets.length > 0 && (
                            <ToggleGroup
                                type="single"
                                variant="outline"
                                size="sm"
                                aria-label={presetsLabel || label}
                                className="justify-start flex-wrap mt-1"
                                value={presets.includes(value) ? String(value) : ""}
                                onValueChange={next => {
                                    if (next !== "") field.onChange(Number(next))
                                }}
                                disabled={isDisabled}
                                dataTestId={`${testId}-presets`}
                            >
                                {presets.map(preset => (
                                    <ToggleGroupItem key={preset} value={String(preset)} className="tabular-nums" dataTestId={`${testId}-preset-${preset}`}>
                                        {format(preset)}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        )}

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

export default SliderField
