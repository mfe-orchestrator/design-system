import type { VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { IconTile } from "../../atoms/iconTile"
import { addTileVariants } from "./addTileVariants"

export interface IAddTileProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">, VariantProps<typeof addTileVariants>, TestIdProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>
    label: React.ReactNode
    description?: React.ReactNode
    /** Icona già istanziata, es. `<Plus />`: viene messa nel riquadro colorato sopra all'etichetta */
    icon?: React.ReactNode
}

/**
 * Tessera tratteggiata che apre la creazione di un nuovo elemento.
 *
 * È un `<button>` vero e non un contenitore con `role="button"`: il browser porta con sé
 * attivazione da tastiera, stato disabilitato e tipo `button` dentro i form, tutte cose
 * che la versione con il `div` doveva riscrivere a mano (e che riscriveva solo in parte).
 */
export const AddTile = React.forwardRef<HTMLButtonElement, IAddTileProps>(({ onClick, label, description, icon, aspect, className, disabled, type = "button", id, dataTestId, ...props }, ref) => {
    const testId = getTestId({ dataTestId, id })

    return (
        <button {...props} ref={ref} type={type} onClick={onClick} disabled={disabled} className={cn(addTileVariants({ aspect }), className)} id={id} data-testid={testId}>
            {icon && <IconTile icon={icon} size="lg" shape="square" tone="primary" />}
            <span className="line-clamp-2 text-base font-semibold text-foreground">{label}</span>
            {description && <span className="line-clamp-2 text-sm text-foreground-secondary">{description}</span>}
        </button>
    )
})

AddTile.displayName = "AddTile"

export default AddTile
