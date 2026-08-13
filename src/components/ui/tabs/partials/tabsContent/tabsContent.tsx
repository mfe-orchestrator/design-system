import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as React from "react"

import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

const baseStyle = `
	mt-4
	w-full
	rounded-md
	ring-offset-background
	focus-visible:outline-none
	focus-visible:ring-2
	focus-visible:ring-ring
	focus-visible:ring-offset-2
`

const TabsContent = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & TestIdProps>(
    ({ className, dataTestId, ...props }, ref) => (
        <TabsPrimitive.Content ref={ref} className={cn(baseStyle, className)} {...props} data-testid={getTestId({ dataTestId, ...props, name: props.value })} />
    )
)
TabsContent.displayName = TabsPrimitive.Content.displayName

export { TabsContent }
