import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { Button } from "../../atoms/button/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card"

export interface IDangerZoneCardProps extends TestIdProps {
    /** Titolo della card (l'intestazione rossa in alto) */
    title?: React.ReactNode
    /** Riga sotto al titolo: cosa rende pericolosa questa sezione */
    description?: React.ReactNode
    /**
     * Tag del titolo della card: va scelto in base ai titoli già presenti nella pagina,
     * perché un salto di livello rompe la navigazione per intestazioni.
     */
    titleAs?: "h2" | "h3" | "h4"
    /** Titolo della singola azione distruttiva */
    actionTitle?: React.ReactNode
    /** Conseguenze dell'azione, in chiaro */
    actionDescription?: React.ReactNode
    /** Deve restare un livello sotto a `titleAs` */
    actionTitleAs?: "h3" | "h4" | "h5"
    actionLabel?: React.ReactNode
    /** Icona dentro al bottone: si passa già istanziata, es. `<Trash2 />` */
    actionIcon?: React.ReactNode
    onAction?: () => void
    disabled?: boolean
    /** Contenuto extra in fondo alla card: tipicamente il dialog di conferma dell'azione */
    children?: React.ReactNode
    className?: string
    id?: string
}

/**
 * Card dal bordo rosso che raccoglie le azioni irreversibili su una risorsa.
 *
 * Non possiede lo stato del dialog di conferma: `onAction` è un semplice callback e
 * l'eventuale dialog si passa come `children`, così la card resta usabile anche per
 * azioni che confermano altrove (o che non confermano affatto).
 */
export const DangerZoneCard: React.FC<IDangerZoneCardProps> = ({
    title = "Danger Zone",
    description = "Irreversible actions. Proceed with caution.",
    titleAs = "h2",
    actionTitle = "Delete",
    actionDescription = "This action cannot be undone.",
    actionTitleAs: ActionHeading = "h3",
    actionLabel = "Delete",
    actionIcon,
    onAction,
    disabled = false,
    children,
    className,
    id,
    dataTestId
}) => {
    const testId = getTestId({ dataTestId, id })

    return (
        <Card id={id} className={cn("border-destructive", className)} dataTestId={testId}>
            <CardHeader>
                <CardTitle as={titleAs} className="text-xl text-destructive mb-0">
                    {title}
                </CardTitle>
                {description && <CardDescription className="text-destructive-active">{description}</CardDescription>}
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex items-center justify-between gap-y-2 gap-x-4 flex-wrap">
                    <div>
                        <ActionHeading className="text-lg font-medium m-0">{actionTitle}</ActionHeading>
                        {actionDescription && <p className="text-foreground-secondary m-0">{actionDescription}</p>}
                    </div>
                    {/* type="button": la card può finire dentro un form e non deve inviarlo */}
                    <Button type="button" variant="destructive" onClick={onAction} disabled={disabled} dataTestId={testId && `${testId}-action`}>
                        {actionIcon}
                        {actionLabel}
                    </Button>
                </div>
                {children}
            </CardContent>
        </Card>
    )
}

DangerZoneCard.displayName = "DangerZoneCard"

export default DangerZoneCard
