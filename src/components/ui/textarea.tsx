import * as React from "react"

import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, TestIdProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, dataTestId, required, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md border-2 border-input bg-background/75 px-3 py-2 text-sm ring-offset-background shadow-input placeholder:text-foreground/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            required={required}
            aria-required={required || undefined}
            {...props}
            data-testid={getTestId({ dataTestId, ...props })}
        />
    )
})
Textarea.displayName = "Textarea"

export { Textarea }
