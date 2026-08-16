import { AlertCircle } from "lucide-react"
import * as React from "react"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { Button } from "../../atoms/button/Button"
import { Alert, AlertDescription, AlertTitle } from "../alert"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../dialog"
import { Input } from "../input/input"
import { Label } from "../label"

export interface IConfirmByTypingDialogProps extends TestIdProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: React.ReactNode
    /** Riga in grassetto dell'avviso rosso */
    warningTitle?: React.ReactNode
    /** Cosa viene distrutto, in chiaro */
    warningDescription?: React.ReactNode
    /** Etichetta del campo: deve dire testualmente cosa digitare */
    confirmationHint?: React.ReactNode
    /** Testo che l'utente deve ridigitare identico per abilitare la conferma */
    expectedText: string
    placeholder?: string
    /** Icona dell'avviso: deve restare un `<svg>` diretto, l'Alert la posiziona in assoluto */
    warningIcon?: React.ReactNode
    confirmLabel?: React.ReactNode
    confirmingLabel?: React.ReactNode
    cancelLabel?: React.ReactNode
    closeLabel?: string
    onConfirm: () => Promise<void> | void
    /** Attesa gestita dal chiamante (es. `mutation.isPending`), in aggiunta a quella interna */
    isPending?: boolean
    /** Contenuto extra fra il campo e i bottoni */
    children?: React.ReactNode
    id?: string
}

/**
 * Dialog di conferma per le azioni irreversibili: il bottone distruttivo resta disabilitato
 * finché l'utente non ridigita `expectedText` esattamente.
 *
 * Il testo digitato vive qui dentro e viene azzerato alla chiusura: se sopravvivesse alla
 * riapertura, il secondo tentativo troverebbe la conferma già sbloccata e la digitazione
 * smetterebbe di essere una barriera.
 */
export const ConfirmByTypingDialog: React.FC<IConfirmByTypingDialogProps> = ({
    open,
    onOpenChange,
    title = "Confirm deletion",
    warningTitle = "This action cannot be undone",
    warningDescription = "This will permanently delete the resource and all of its data.",
    confirmationHint,
    expectedText,
    placeholder,
    warningIcon = <AlertCircle className="h-4 w-4" aria-hidden="true" focusable="false" />,
    confirmLabel = "Delete",
    confirmingLabel = "Deleting...",
    cancelLabel = "Cancel",
    closeLabel = "Close",
    onConfirm,
    isPending = false,
    children,
    id,
    dataTestId
}) => {
    const [typedText, setTypedText] = React.useState("")
    const [isConfirming, setIsConfirming] = React.useState(false)
    const generatedId = React.useId()
    const baseId = id ?? generatedId
    const inputId = `${baseId}-confirmation-input`
    const hintId = `${baseId}-confirmation-hint`
    const warningId = `${baseId}-confirmation-warning`
    const testId = getTestId({ dataTestId, id, name: "confirm-by-typing-dialog" })

    const busy = isPending || isConfirming
    const canConfirm = typedText === expectedText && !busy

    React.useEffect(() => {
        if (!open) setTypedText("")
    }, [open])

    const handleOpenChange = (nextOpen: boolean) => {
        // Chiudere mentre l'azione è in volo lascerebbe l'utente senza esito: si blocca
        // Esc, click fuori e bottone di chiusura finché la promise non si risolve.
        if (!nextOpen && busy) return
        onOpenChange(nextOpen)
    }

    const handleConfirm = async () => {
        if (!canConfirm) return

        try {
            setIsConfirming(true)
            await onConfirm()
            onOpenChange(false)
        } finally {
            // Il chiamante può restare montato (errore, oppure nessuna navigazione dopo il successo):
            // lo stato di attesa va spento qui, non affidato allo smontaggio del dialog.
            setIsConfirming(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent id={id} className="max-w-lg w-[calc(100vw-2rem)]" closeLabel={closeLabel} aria-busy={busy || undefined} dataTestId={testId}>
                <DialogHeader className="mb-4">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                {/* Nessun role esplicito: l'Alert destructive rende già role="alert" */}
                <Alert variant="destructive" className="mb-4" dataTestId={testId && `${testId}-warning`}>
                    {warningIcon}
                    <AlertTitle>{warningTitle}</AlertTitle>
                    <AlertDescription id={warningId} className="mt-2">
                        {warningDescription}
                    </AlertDescription>
                </Alert>

                <div className="space-y-2 py-4">
                    <Label id={hintId} htmlFor={inputId} className="text-foreground-secondary">
                        {confirmationHint ?? `Type ${expectedText} to confirm`}
                    </Label>
                    <Input
                        id={inputId}
                        fullWidth
                        autoComplete="off"
                        placeholder={placeholder ?? expectedText}
                        value={typedText}
                        onChange={event => setTypedText(event.target.value)}
                        aria-describedby={warningId}
                        disabled={busy}
                        dataTestId={testId && `${testId}-input`}
                    />
                </div>

                {children}

                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => handleOpenChange(false)} disabled={busy} dataTestId={testId && `${testId}-cancel`}>
                        {cancelLabel}
                    </Button>
                    {/* aria-describedby sull'etichetta del campo: un bottone disabilitato non dice da sé perché lo è */}
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={!canConfirm}
                        aria-describedby={hintId}
                        aria-busy={busy || undefined}
                        dataTestId={testId && `${testId}-confirm`}
                    >
                        {busy ? confirmingLabel : confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

ConfirmByTypingDialog.displayName = "ConfirmByTypingDialog"

export default ConfirmByTypingDialog
