import type { VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { colorSwatchVariants } from "./colorSwatchVariants"

export interface IColorSwatchProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "title">, VariantProps<typeof colorSwatchVariants>, TestIdProps {
    /** Tinta applicata inline: arriva dai dati dell'applicazione, non dai token del tema */
    color?: string
    /** Descrizione della tinta, es. «Colore dell'ambiente Staging»: diventa tooltip e nome accessibile */
    title?: string
    id?: string
}

/**
 * Pastiglia tonda che mostra una tinta arbitraria.
 *
 * Il colore è un'informazione puramente visiva: senza `title` la pastiglia non aggiunge nulla a chi
 * usa uno screen reader e viene nascosta, altrimenti verrebbe annunciato un elemento vuoto accanto
 * a ogni riga. Con `title` diventa invece un'immagine con nome accessibile.
 */
export const ColorSwatch: React.FC<IColorSwatchProps> = ({ color, size, title, className, style, id, dataTestId, ...props }) => {
    return (
        <span
            {...props}
            id={id}
            className={cn(colorSwatchVariants({ size }), className)}
            style={{ backgroundColor: color, ...style }}
            title={title}
            role={title ? "img" : undefined}
            aria-label={title}
            aria-hidden={title ? undefined : "true"}
            data-testid={getTestId({ dataTestId, id })}
        />
    )
}

ColorSwatch.displayName = "ColorSwatch"

export default ColorSwatch
