import { VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { inputVariants } from "./inputVariants"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    fullWidth?: boolean
    onDebounce?: (value: string | number | readonly string[]) => void | Promise<void>
    debounceTime?: number
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, layoutSize, fullWidth, onDebounce, debounceTime = 500, ...props }, ref) => {
    // Il callback vive in una ref: se finisse nelle dipendenze dell'effect, una
    // funzione ricreata a ogni render farebbe ripartire il timer all'infinito
    // (loop di richieste anche a valore invariato).
    const onDebounceRef = React.useRef(onDebounce)
    onDebounceRef.current = onDebounce

    const value = props.value

    React.useEffect(() => {
        if (!onDebounceRef.current) return
        const timeoutId = setTimeout(() => {
            if (value !== undefined) {
                onDebounceRef.current?.(value)
            }
        }, debounceTime)

        return () => clearTimeout(timeoutId)
    }, [value, debounceTime])

    return <input type={type} className={cn(inputVariants({ layoutSize, fullWidth }), className)} ref={ref} {...props} />
})
Input.displayName = "Input"

export { Input }
