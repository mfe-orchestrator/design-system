import { useState } from "react"
import { Controller, type FieldError, type FieldValues, type Path, type RegisterOptions, useFormContext } from "react-hook-form"
import { ColorPicker as ColorPickerComponent } from "react-pick-color"
import { Button } from "@/components/atoms"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { Label } from "../ui/label"

export const DEFAULT_COLORS = [
    // Blues
    "#93C5FD",
    "#60A5FA",
    "#1D4ED8",
    // Greens
    "#6EE7B7",
    "#34D399",
    "#047857",
    // Reds
    "#EF4444",
    "#DC2626",
    "#B91C1C",
    // Yellows/Oranges
    "#FCD34D",
    "#FBBF24",
    "#F97316",
    "#EA580C",
    // Purples/Violets
    "#8B5CF6",
    "#7C3AED",
    "#6D28D9",
    "#9333EA",
    // Pinks
    "#EC4899",
    "#DB2777",
    // Teals
    "#14B8A6",
    "#0D9488",
    // Indigos
    "#6366F1",
    "#4F46E5",
    // Grays
    "#6B7280",
    "#4B5563",
    // Additional distinct colors
    "#8B5A2B",
    "#A52A2A",
    "#2E8B57"
]

type ColorPickerCustomProps<T extends FieldValues> = TestIdProps & {
    name: Path<T>
    label: string
    rules?: RegisterOptions<T>
    id?: string
    required?: boolean
    className?: string
    presetColors?: string[]
    dialogTitle?: string
    cancelLabel?: string
    okLabel?: string
    /** Descrizione del dialog, associata tramite aria-describedby */
    dialogDescription?: string
    /** Prefisso del nome accessibile del bottone che apre il picker */
    triggerLabel?: string
    /** Prefisso del nome accessibile delle tinte predefinite */
    presetLabel?: string
    /** Testo annunciato dagli screen reader per il marcatore di campo obbligatorio */
    requiredLabel?: string
}

const ColorPicker = <T extends FieldValues>({
    id,
    name,
    label,
    rules,
    required,
    className,
    dataTestId,
    presetColors = DEFAULT_COLORS,
    dialogTitle = "Select color",
    cancelLabel = "Cancel",
    okLabel = "OK",
    dialogDescription = "Pick a color from the palette or enter a custom one, then confirm.",
    triggerLabel = "Current color",
    presetLabel = "Color",
    requiredLabel = "required"
}: ColorPickerCustomProps<T>) => {
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
    const [editingColor, setEditingColor] = useState<string>("")

    const {
        control,
        formState: { errors }
    } = useFormContext<T>()

    const error = errors[name] as FieldError | undefined
    const inputId = id || name
    const errorId = `${inputId}-error`
    const testId = getTestId({ dataTestId, id, name })
    const isRequired = required || !!rules?.required

    const handlePickerChange = (color: string) => {
        setEditingColor(color)
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <div className={`grid gap-2 ${className || ""}`}>
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

                    <div className="relative">
                        {/* Un `div` con onClick non è raggiungibile da tastiera: serve un vero bottone */}
                        <button
                            type="button"
                            id={inputId}
                            data-testid={testId}
                            aria-haspopup="dialog"
                            aria-expanded={showColorPicker}
                            aria-invalid={!!error}
                            aria-describedby={error ? errorId : undefined}
                            aria-label={`${triggerLabel}: ${field.value || "—"}`}
                            className="w-8 h-8 rounded-md cursor-pointer border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            style={{ backgroundColor: field.value }}
                            onClick={e => {
                                e.stopPropagation()
                                setShowColorPicker(true)
                                setEditingColor(field.value)
                            }}
                        />
                        <Dialog open={showColorPicker} onOpenChange={setShowColorPicker}>
                            <DialogContent className="sm:max-w-md" data-testid={testId ? `${testId}-dialog` : undefined}>
                                <DialogHeader>
                                    <DialogTitle>{dialogTitle}</DialogTitle>
                                    <DialogDescription className="sr-only">{dialogDescription}</DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                    <ColorPickerComponent color={editingColor || field.value} onChange={e => handlePickerChange(e.hex)} hideInputs />
                                    <fieldset className="grid grid-cols-5 gap-2 mt-3 border-0 p-0 m-0">
                                        <legend className="sr-only">{dialogTitle}</legend>
                                        {presetColors.map(color => {
                                            const normalized = color.startsWith("#") ? color : `#${color}`

                                            return (
                                                <button
                                                    key={color}
                                                    type="button"
                                                    aria-label={`${presetLabel} ${normalized}`}
                                                    aria-pressed={(editingColor || field.value)?.toLowerCase() === normalized.toLowerCase()}
                                                    data-testid={testId ? `${testId}-preset-${normalized.replace("#", "")}` : undefined}
                                                    className="w-6 h-6 rounded cursor-pointer border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    style={{ backgroundColor: color }}
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        handlePickerChange(normalized)
                                                    }}
                                                />
                                            )
                                        })}
                                    </fieldset>
                                    <div className="mt-3 flex items-center justify-end">
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                dataTestId={testId ? `${testId}-cancel` : undefined}
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    setShowColorPicker(false)
                                                    setEditingColor("")
                                                }}
                                            >
                                                {cancelLabel}
                                            </Button>
                                            <Button
                                                type="button"
                                                dataTestId={testId ? `${testId}-confirm` : undefined}
                                                className="bg-purple-600 hover:bg-purple-700 text-white"
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    field.onChange(editingColor || field.value)
                                                    setShowColorPicker(false)
                                                    setEditingColor("")
                                                }}
                                            >
                                                {okLabel}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
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

export default ColorPicker
