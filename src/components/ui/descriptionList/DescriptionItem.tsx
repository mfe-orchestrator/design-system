import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { DescriptionListContext } from "./DescriptionList"
import { descriptionDetailVariants, descriptionItemVariants, descriptionTermVariants } from "./descriptionListVariants"

export interface IDescriptionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, TestIdProps {
    label: React.ReactNode
    children: React.ReactNode
    /** Riga di spiegazione sotto al valore, es. il motivo per cui un campo non è modificabile */
    hint?: React.ReactNode
    /** Per identificativi e chiavi, dove la larghezza costante dei caratteri aiuta a confrontarli */
    monospace?: boolean
    id?: string
}

/**
 * Riga di un `DescriptionList`: `<dt>` e `<dd>` avvolti in un `<div>`, che dentro un `<dl>`
 * è l'unico modo valido per tenere insieme la coppia e darle un layout proprio.
 */
export const DescriptionItem: React.FC<IDescriptionItemProps> = ({ label, children, hint, monospace = false, className, id, dataTestId, ...props }) => {
    const { orientation } = React.useContext(DescriptionListContext)
    const testId = getTestId({ dataTestId, id })

    return (
        <div {...props} id={id} className={cn(descriptionItemVariants({ orientation }), className)} data-testid={testId}>
            <dt className={descriptionTermVariants({ orientation })}>{label}</dt>
            <dd className={cn(descriptionDetailVariants({ orientation }), monospace && "font-mono break-all")}>
                {children}
                {hint && <p className="text-sm font-normal text-foreground-secondary">{hint}</p>}
            </dd>
        </div>
    )
}

DescriptionItem.displayName = "DescriptionItem"

export default DescriptionItem
