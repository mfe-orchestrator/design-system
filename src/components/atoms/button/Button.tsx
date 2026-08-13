import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId } from "@/utils/testIdUtils"
import { ButtonVariants } from "./ButtonVariants"
import { IButtonProps } from "./IButtonProps"

export const Button: React.FC<IButtonProps> = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, IButtonProps>(
    ({ className, variant, size, asChild = false, href, disabled, type, id, dataTestId, target, rel, renderLink, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        const testId = getTestId({ dataTestId, id, ...props })

        if (href) {
            const linkClassName = cn(ButtonVariants({ variant, size }), className)

            if (renderLink) {
                return renderLink({ href, className: linkClassName, children: props.children, id, dataTestId: testId })
            }

            // Un anchor non supporta l'attributo `disabled`: si rimuove l'href e si esclude
            // dall'ordine di tabulazione mantenendo il ruolo per gli screen reader.
            return (
                <a
                    {...props}
                    className={linkClassName}
                    href={disabled ? undefined : href}
                    target={target}
                    rel={rel ?? (target === "_blank" ? "noreferrer" : undefined)}
                    role={disabled ? "link" : undefined}
                    aria-disabled={disabled || undefined}
                    tabIndex={disabled ? -1 : props.tabIndex}
                    id={id}
                    data-testid={testId}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                />
            )
        }

        return (
            <Comp
                {...props}
                className={cn(ButtonVariants({ variant, size }), className)}
                disabled={disabled}
                aria-disabled={disabled || undefined}
                type={type}
                id={id}
                data-testid={testId}
                ref={ref as React.Ref<HTMLButtonElement>}
            />
        )
    }
)

Button.displayName = "Button"

export default Button
