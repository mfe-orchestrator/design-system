import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker, getDefaultClassNames, type Locale } from "react-day-picker"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import "react-day-picker/dist/style.css"
import { Controller, type FieldError, type FieldValues, type Path, type RegisterOptions, useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Button } from "../atoms/button/Button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

type CalendarFieldProps<T extends FieldValues> = TestIdProps & {
    name: Path<T>
    id?: string
    label?: string
    rules?: RegisterOptions<T>
    className?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    minDate?: Date
    locale?: Locale
    /** Testo di aiuto associato al campo tramite aria-describedby */
    description?: string
    /** Testo annunciato dagli screen reader per il marcatore di campo obbligatorio */
    requiredLabel?: string
}

const CalendarField = <T extends FieldValues>({
    name,
    label,
    rules,
    id,
    className,
    placeholder = "Select a date",
    disabled = false,
    required,
    minDate,
    locale,
    dataTestId,
    description,
    requiredLabel = "required"
}: CalendarFieldProps<T>) => {
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
    const defaultClassNames = getDefaultClassNames()
    const disabledDays = disabled ? true : minDate ? { before: minDate } : undefined

    return (
        <div className={cn("w-full", className)}>
            {label && (
                <Label htmlFor={inputId} className={cn("mb-1 block", error ? "text-destructive" : "text-foreground-secondary")}>
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
                <p id={descriptionId} className="mb-1 text-sm text-foreground-secondary">
                    {description}
                </p>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value, ...field } }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="secondary"
                                id={inputId}
                                dataTestId={testId}
                                aria-haspopup="dialog"
                                aria-invalid={!!error}
                                aria-describedby={describedBy}
                                aria-required={isRequired || undefined}
                                className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground", error && "border-destructive")}
                                disabled={disabled}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" />
                                {value ? format(new Date(value), "PPP", { locale }) : <span>{placeholder}</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" aria-label={label ?? placeholder}>
                            <DayPicker
                                className="p-3"
                                style={
                                    {
                                        "--rdp-accent-color": "hsl(var(--primary))",
                                        "--rdp-accent-background-color": "hsl(var(--accent))",
                                        "--rdp-today-color": "hsl(var(--primary))",
                                        "--rdp-selected-border": "none",
                                        "--rdp-day-width": "2.25rem",
                                        "--rdp-day-height": "2.25rem"
                                    } as React.CSSProperties
                                }
                                classNames={{
                                    day_button: cn(defaultClassNames.day_button, "rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"),
                                    selected: cn(defaultClassNames.selected, "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary-active [&>button]:font-medium"),
                                    today: cn(defaultClassNames.today, "text-primary font-semibold"),
                                    disabled: cn(defaultClassNames.disabled, "opacity-40")
                                }}
                                animate={true}
                                locale={locale}
                                mode="single"
                                selected={value ? new Date(value) : undefined}
                                onSelect={date => onChange(date)}
                                disabled={disabledDays}
                                autoFocus
                                data-testid={testId ? `${testId}-calendar` : undefined}
                                {...field}
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
            {error?.message && (
                <p id={errorId} role="alert" className="mt-1 text-sm text-destructive">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default CalendarField
