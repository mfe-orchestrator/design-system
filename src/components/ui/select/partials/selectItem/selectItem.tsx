import * as SelectPrimitive from "@radix-ui/react-select"
import { Check } from "lucide-react"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { SelectContext } from "../../select"
import { selectItemVariants } from "./selectItemVariants"

const SelectItem = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & TestIdProps>(
    ({ className, children, dataTestId, ...props }, ref) => {
        const { layoutSize } = React.useContext(SelectContext)

        return (
            <SelectPrimitive.Item ref={ref} className={cn(selectItemVariants({ layoutSize }), className)} {...props} data-testid={getTestId({ dataTestId, ...props, name: props.value })}>
                <SelectPrimitive.ItemIndicator className="icon-container">
                    <Check aria-hidden="true" focusable="false" />
                </SelectPrimitive.ItemIndicator>

                <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
        )
    }
)

SelectItem.displayName = SelectPrimitive.Item.displayName

export { SelectItem }
