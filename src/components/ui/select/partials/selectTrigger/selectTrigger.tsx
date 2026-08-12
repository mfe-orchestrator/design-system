import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { SelectContext } from "../../select"
import { selectTriggerVariants } from "./selecTriggerVariants"

const SelectTrigger = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & TestIdProps>(
    ({ className, children, dataTestId, ...props }, ref) => {
        const { layoutSize, fullWidth } = React.useContext(SelectContext)
        return (
            <SelectPrimitive.Trigger ref={ref} className={cn(selectTriggerVariants({ layoutSize, fullWidth }), className)} {...props} data-testid={getTestId({ dataTestId, ...props })}>
                {children}
                <SelectPrimitive.Icon asChild>
                    <ChevronDown aria-hidden="true" focusable="false" />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
        )
    }
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

export { SelectTrigger }
