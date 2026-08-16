import type { VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { descriptionListVariants } from "./descriptionListVariants"

export type DescriptionListOrientation = NonNullable<VariantProps<typeof descriptionListVariants>["orientation"]>

export interface IDescriptionListContextValue {
    orientation: DescriptionListOrientation
}

/** Fuori da un `DescriptionList` gli item ricadono sull'orientamento predefinito invece di rompersi */
export const DescriptionListContext = React.createContext<IDescriptionListContextValue>({ orientation: "stacked" })

export interface IDescriptionListProps extends React.HTMLAttributes<HTMLDListElement>, TestIdProps {
    // Non si estende `VariantProps`: quella ammette anche `null`, che qui finirebbe nel context
    // e lascerebbe gli item senza orientamento.
    orientation?: DescriptionListOrientation
    children: React.ReactNode
    id?: string
}

/**
 * Elenco di coppie etichetta/valore, reso con `<dl>`.
 *
 * L'orientamento viaggia in un context e non come prop di ogni riga: è una scelta
 * dell'elenco, e passarla a mano riga per riga è esattamente il modo in cui le quattro
 * copie applicative avevano finito per divergere.
 */
export const DescriptionList: React.FC<IDescriptionListProps> = ({ orientation = "stacked", children, className, id, dataTestId, ...props }) => {
    const testId = getTestId({ dataTestId, id })
    const contextValue = React.useMemo<IDescriptionListContextValue>(() => ({ orientation }), [orientation])

    return (
        <DescriptionListContext.Provider value={contextValue}>
            <dl {...props} id={id} className={cn(descriptionListVariants({ orientation }), className)} data-testid={testId}>
                {children}
            </dl>
        </DescriptionListContext.Provider>
    )
}

DescriptionList.displayName = "DescriptionList"

export default DescriptionList
