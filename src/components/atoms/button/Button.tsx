import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import Spinner from "@/components/Spinner"
import { cn } from "@/utils/styleUtils"
import { getTestId } from "@/utils/testIdUtils"
import { ButtonVariants } from "./ButtonVariants"
import { IButtonProps } from "./IButtonProps"

// Lo spinner deve misurare quanto le icone della stessa taglia (regole `[&_svg]:size-*` di
// ButtonVariants): se fosse più grande o più piccolo il testo si sposterebbe all'inizio del caricamento.
const spinnerSizeByButtonSize: Record<NonNullable<IButtonProps["size"]>, number> = {
    default: 20,
    sm: 16,
    lg: 20,
    icon: 20,
    "icon-sm": 16
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, IButtonProps>(
    ({ className, variant, size, asChild = false, href, disabled, loading = false, loadingLabel = "Loading…", type, id, dataTestId, target, rel, renderLink, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        const testId = getTestId({ dataTestId, id, ...props })
        const isDisabled = disabled || loading

        // Lo Spinner porta già la propria etichetta sr-only: è l'unica fonte dell'annuncio,
        // così il nome accessibile resta "etichetta di caricamento + contenuto" senza ripetizioni.
        // Nelle taglie solo-icona sostituisce il contenuto, perché due glifi affiancati
        // non entrerebbero nel quadrato del bottone (il nome arriva comunque da `aria-label`).
        const spinner = <Spinner centerScreen={false} size={spinnerSizeByButtonSize[size ?? "default"]} label={loadingLabel} />
        const isIconOnly = size === "icon" || size === "icon-sm"
        // Con `asChild` il contenuto è governato dal figlio (Slot accetta un solo elemento):
        // in quel caso restano solo `aria-busy` e la disabilitazione.
        const content =
            !loading || asChild ? (
                children
            ) : isIconOnly ? (
                spinner
            ) : (
                <>
                    {spinner}
                    {children}
                </>
            )

        if (href) {
            const linkClassName = cn(ButtonVariants({ variant, size }), className)

            if (renderLink) {
                return renderLink({ href, className: linkClassName, children: content, id, dataTestId: testId })
            }

            // Un anchor non supporta l'attributo `disabled`: si rimuove l'href e si esclude
            // dall'ordine di tabulazione mantenendo il ruolo per gli screen reader.
            return (
                <a
                    {...props}
                    className={linkClassName}
                    href={isDisabled ? undefined : href}
                    target={target}
                    rel={rel ?? (target === "_blank" ? "noreferrer" : undefined)}
                    role={isDisabled ? "link" : undefined}
                    aria-disabled={isDisabled || undefined}
                    aria-busy={loading || undefined}
                    tabIndex={isDisabled ? -1 : props.tabIndex}
                    id={id}
                    data-testid={testId}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {content}
                </a>
            )
        }

        return (
            <Comp
                {...props}
                className={cn(ButtonVariants({ variant, size }), className)}
                disabled={isDisabled}
                aria-disabled={isDisabled || undefined}
                aria-busy={loading || undefined}
                type={type}
                id={id}
                data-testid={testId}
                ref={ref as React.Ref<HTMLButtonElement>}
            >
                {content}
            </Comp>
        )
    }
)

Button.displayName = "Button"

export default Button
