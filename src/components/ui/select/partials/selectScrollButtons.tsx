import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown, ChevronUp } from "lucide-react"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

const baseStyle = `
	flex
	cursor-default
	items-center
	justify-center
	py-2 px-1
`

const SelectScrollUpButton = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & TestIdProps>(
    ({ className, dataTestId, ...props }, ref) => (
        <SelectPrimitive.ScrollUpButton
            ref={ref}
            aria-hidden="true"
            className={cn(baseStyle, "shadow-[0_2px_4px_rgba(13,0,72,0.125)]", className)}
            {...props}
            data-testid={getTestId({ dataTestId, ...props })}
        >
            <ChevronUp size="1rem" aria-hidden="true" focusable="false" />
        </SelectPrimitive.ScrollUpButton>
    )
)
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & TestIdProps>(
    ({ className, dataTestId, ...props }, ref) => (
        <SelectPrimitive.ScrollDownButton
            ref={ref}
            aria-hidden="true"
            className={cn(baseStyle, "shadow-[0_-2px_4px_rgba(13,0,72,0.125)]", className)}
            {...props}
            data-testid={getTestId({ dataTestId, ...props })}
        >
            <ChevronDown size="1rem" aria-hidden="true" focusable="false" />
        </SelectPrimitive.ScrollDownButton>
    )
)
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

export { SelectScrollDownButton, SelectScrollUpButton }
