import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { SelectContext } from "../../select"
import { SelectControlContext } from "../selectControl/selectControl"
import { selectTriggerVariants } from "./selecTriggerVariants"

const SelectTrigger = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & TestIdProps>(
    ({ className, children, dataTestId, id, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
        const { layoutSize, fullWidth } = React.useContext(SelectContext)
        const { controlId, labelId, describedBy } = React.useContext(SelectControlContext)
        const triggerId = id ?? controlId

        return (
            <SelectPrimitive.Trigger
                ref={ref}
                className={cn(selectTriggerVariants({ layoutSize, fullWidth }), className)}
                {...props}
                id={triggerId}
                // Il trigger cita anche sé stesso: così il nome accessibile resta "etichetta + valore scelto",
                // mentre con il solo `htmlFor` alcuni screen reader leggerebbero soltanto il valore.
                aria-labelledby={ariaLabelledBy ?? (labelId && triggerId ? `${labelId} ${triggerId}` : undefined)}
                aria-describedby={ariaDescribedBy ?? describedBy}
                data-testid={getTestId({ dataTestId, id, ...props })}
            >
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
