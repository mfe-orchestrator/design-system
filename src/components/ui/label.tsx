import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

const labelVariants = cva("font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
    variants: {
        textSize: {
            default: "text-sm",
            sm: "text-xs",
            lg: "text-md"
        }
    },
    defaultVariants: {
        textSize: "default"
    }
})

const Label = React.forwardRef<React.ComponentRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants> & TestIdProps>(
    ({ className, textSize, dataTestId, ...props }, ref) => (
        <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ textSize }), className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
    )
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label, labelVariants }
