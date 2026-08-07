import { useState } from "react"
import { Controller, FieldError, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form"
import { ColorPicker as ColorPickerComponent } from "react-pick-color"
import { Button } from "@/components/atoms"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

type ColorPickerCustomProps<T extends FieldValues> = {
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
}

const ColorPicker = <T extends FieldValues>({
    id,
    name,
    label,
    rules,
    required,
    className,
    presetColors = DEFAULT_COLORS,
    dialogTitle = "Select color",
    cancelLabel = "Cancel",
    okLabel = "OK"
}: ColorPickerCustomProps<T>) => {
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
    const [editingColor, setEditingColor] = useState<string>("")

    const {
        control,
        formState: { errors }
    } = useFormContext<T>()

    const error = errors[name] as FieldError | undefined
    const inputId = name || id

    const handlePickerChange = (color: string) => {
        setEditingColor(color)
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, formState }) => (
                <div className={`grid gap-2 ${className}`}>
                    {label && (
                        <Label htmlFor={inputId} className={error ? "text-destructive" : ""}>
                            {label}
                            {required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                    )}

                    <div className="relative">
                        <div
                            className="w-8 h-8 rounded-md cursor-pointer border border-gray-300"
                            style={{ backgroundColor: field.value }}
                            onClick={e => {
                                e.stopPropagation()
                                setShowColorPicker(true)
                                setEditingColor(field.value)
                            }}
                        />
                        <Dialog open={showColorPicker} onOpenChange={setShowColorPicker}>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{dialogTitle}</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <ColorPickerComponent color={editingColor || field.value} onChange={e => handlePickerChange(e.hex)} hideInputs />
                                    <div className="grid grid-cols-5 gap-2 mt-3">
                                        {presetColors.map(color => (
                                            <div
                                                key={color}
                                                className="w-6 h-6 rounded cursor-pointer border border-gray-200"
                                                style={{ backgroundColor: color }}
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    handlePickerChange(color.startsWith("#") ? color : `#${color}`)
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-sm text-gray-600"></div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="secondary"
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

                    {error && <p className="text-sm font-medium text-destructive">{error.message}</p>}
                </div>
            )}
        />
    )
}

export default ColorPicker
