import type * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { TableCell, TableRow } from "../table"

export interface IEmptyStateRowProps extends TestIdProps {
    /** Numero di colonne della tabella: senza, la cella non copre tutta la riga */
    colSpan: number
    children: React.ReactNode
    className?: string
    id?: string
}

/**
 * Riga di tabella che comunica l'assenza di risultati.
 *
 * Esiste separata da `EmptyState` perché dentro un `<tbody>` è valido solo un `<tr>`:
 * un `<div>` verrebbe spostato fuori dalla tabella dal parser HTML.
 */
export const EmptyStateRow: React.FC<IEmptyStateRowProps> = ({ colSpan, children, className, id, dataTestId }) => {
    const testId = getTestId({ dataTestId, id })

    return (
        <TableRow>
            <TableCell colSpan={colSpan} id={id} className={cn("h-24 text-center text-foreground-secondary", className)} data-testid={testId}>
                {children}
            </TableCell>
        </TableRow>
    )
}

EmptyStateRow.displayName = "EmptyStateRow"

export default EmptyStateRow
