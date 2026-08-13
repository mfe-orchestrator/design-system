import type { VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { BadgeVariants } from "./BadgeVariants"

export interface IBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof BadgeVariants>, TestIdProps {}

export const Badge: React.FC<IBadgeProps> = ({ className, variant, size, dataTestId, ...props }) => {
    return <div {...props} className={cn("badge", BadgeVariants({ variant, size }), className)} data-testid={getTestId({ dataTestId, ...props })} />
}

Badge.displayName = "Badge"

export default Badge
