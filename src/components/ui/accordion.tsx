import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

const Accordion = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & TestIdProps>(
    ({ dataTestId, ...props }, ref) => <AccordionPrimitive.Root ref={ref} {...props} data-testid={getTestId({ dataTestId, ...props })} />
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & TestIdProps>(
    ({ className, dataTestId, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("group", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & TestIdProps>(
    ({ className, children, dataTestId, ...props }, ref) => (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "border-b border-divider group-last:data-[state=closed]:border-b-0 flex flex-1 items-center justify-between py-4 px-1 -mx-1 font-medium transition-all hover:[&:not(:focus)]:shadow-[inset_0_-4px_0_rgba(49,21,153,0.25)] focus:outline-none focus:ring-4 focus:ring-ring focus:rounded-sm [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                {...props}
                data-testid={getTestId({ dataTestId, ...props })}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" aria-hidden="true" focusable="false" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Content>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & TestIdProps>(
    ({ className, children, dataTestId, ...props }, ref) => (
        <AccordionPrimitive.Content
            ref={ref}
            className="transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            {...props}
            data-testid={getTestId({ dataTestId, ...props })}
        >
            <div className={cn("pb-6 pt-4", className)}>{children}</div>
        </AccordionPrimitive.Content>
    )
)

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
