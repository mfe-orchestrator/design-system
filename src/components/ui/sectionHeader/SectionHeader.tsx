import type * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

export interface ISectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, TestIdProps {
    title: React.ReactNode
    description?: React.ReactNode
    /** Icona già istanziata, es. `<History />`: è decorativa e resta fuori dal nome accessibile del titolo */
    icon?: React.ReactNode
    /** Controllo allineato a destra sulla stessa riga del titolo (checkbox, bottone, switch di vista) */
    actions?: React.ReactNode
    /**
     * Tag del titolo: si sceglie in base ai titoli già presenti nella pagina, perché
     * un salto di livello rompe la navigazione per intestazioni. La resa grafica non cambia.
     */
    as?: "h2" | "h3"
    id?: string
}

/**
 * Intestazione di una sezione di pagina, in tono secondario e con un controllo opzionale a destra.
 *
 * L'icona sta accanto all'intestazione e non dentro: dentro finirebbe nel nome accessibile,
 * facendo annunciare il glifo insieme al testo del titolo.
 */
export const SectionHeader: React.FC<ISectionHeaderProps> = ({ title, description, icon, actions, as: Heading = "h2", className, id, dataTestId, ...props }) => {
    const testId = getTestId({ dataTestId, id })

    return (
        <div {...props} id={id} className={cn("mb-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2", className)} data-testid={testId}>
            <div className="flex min-w-0 items-center gap-2 text-foreground-secondary">
                {icon && (
                    <span aria-hidden="true" className="flex shrink-0 items-center [&_svg]:size-5">
                        {icon}
                    </span>
                )}
                <div className="min-w-0">
                    <Heading className="text-xl font-semibold">{title}</Heading>
                    {description && <p className="text-sm">{description}</p>}
                </div>
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>
    )
}

SectionHeader.displayName = "SectionHeader"

export default SectionHeader
