import * as React from "react"

import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

type CardDivProps = React.HTMLAttributes<HTMLDivElement> & TestIdProps

const Card = React.forwardRef<HTMLDivElement, CardDivProps>(({ className, dataTestId, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border-2 border-border bg-card text-card-foreground p-3", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardDivProps>(({ className, dataTestId, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 pb-3 border-b border-divider", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & TestIdProps & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }>(
    ({ children, className, dataTestId, as: Heading = "h3", ...props }, ref) => (
        <Heading ref={ref} className={cn("text-lg/6 tracking-normal font-semibold mb-3", className)} {...props} data-testid={getTestId({ dataTestId, ...props })}>
            {children}
        </Heading>
    )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & TestIdProps>(({ className, dataTestId, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, CardDivProps>(({ className, dataTestId, ...props }, ref) => (
    <div ref={ref} className={className} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, CardDivProps>(({ className, dataTestId, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
