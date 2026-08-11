import clsx from "clsx"
import { Controller, FieldError, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type SliderFieldProps<T extends FieldValues> = {
    name: Path<T>
    label: string
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
    required?: boolean
    disabled?: boolean
    className?: string
    containerClassName?: string
    dataTestId?: string
}

const SliderField = <T extends FieldValues>({
    name,
    label,
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
    const inputId = name
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
                    <div className={clsx("flex flex-col gap-1", containerClassName)} data-testid={dataTestId || inputId}>
                        <div className="flex items-baseline justify-between gap-2">
                            <Label htmlFor={inputId} className={error ? "text-destructive" : "text-foreground-secondary"}>
                                {label}
                                {required && <span className="text-destructive ml-1">*</span>}
                            </Label>
                            {!hideValue && (
                                <output
                                    htmlFor={inputId}
                                    className={clsx("text-xl font-semibold tabular-nums", error ? "text-destructive" : "text-primary")}
                                    data-testid={`${dataTestId || inputId}-value`}
                                >
                                    {format(value)}
                                </output>
                            )}
                        </div>

                        <Slider
                            id={inputId}
                            thumbAriaLabel={label}
                            aria-invalid={!!error}
                            min={min}
                            max={max}
                            step={step}
                            disabled={isDisabled}
                            value={[value]}
                            onValueChange={([next]) => field.onChange(next)}
                            onBlur={field.onBlur}
                            className={className}
                        />

                        {!hideBounds && (
                            <div className="flex justify-between text-xs text-foreground-secondary tabular-nums">
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
                            >
                                {presets.map(preset => (
                                    <ToggleGroupItem key={preset} value={String(preset)} className="tabular-nums" data-testid={`${dataTestId || inputId}-preset-${preset}`}>
                                        {format(preset)}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        )}

                        {error && <p className="text-sm font-medium text-destructive">{error.message}</p>}
                    </div>
                )
            }}
        />
    )
}

export default SliderField
