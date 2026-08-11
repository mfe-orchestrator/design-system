import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/utils/styleUtils"

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    /** Etichetta accessibile dei thumb: una stringa per tutti, o una per thumb */
    thumbAriaLabel?: string | string[]
}

const Slider = React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(({ className, thumbAriaLabel, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn("relative flex w-full touch-none select-none items-center py-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50", className)} {...props}>
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {(props.value ?? props.defaultValue ?? [0]).map((_, index) => (
            <SliderPrimitive.Thumb
                // i thumb sono posizionali: l'indice e' l'unica identita stabile
                key={index}
                aria-label={Array.isArray(thumbAriaLabel) ? thumbAriaLabel[index] : thumbAriaLabel}
                className="block h-5 w-5 cursor-grab rounded-full border-2 border-primary bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:cursor-grabbing disabled:pointer-events-none"
            />
        ))}
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
