import type { VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { CopyButton } from "../../atoms/copyButton/CopyButton"
import { codeBlockVariants } from "./codeBlockVariants"

export interface ICodeBlockProps extends Omit<React.HTMLAttributes<HTMLPreElement>, "children">, VariantProps<typeof codeBlockVariants>, TestIdProps {
    /** Contenuto del blocco: comando, snippet o risposta da mostrare così com'è */
    code: string
    /** Riga descrittiva sopra il blocco (passo dell'istruzione, percorso del file, ...) */
    label?: React.ReactNode
    /** Aggiunge in alto a destra il bottone che copia `code` negli appunti */
    copyable?: boolean
    copyLabel?: string
    copiedLabel?: string
    /** Classe di altezza massima: oltre quella il blocco scorre in verticale (es. `max-h-60`) */
    maxHeightClassName?: string
    /** Linguaggio del frammento, esposto come `data-language` per gli evidenziatori */
    language?: string
    /** Classe del contenitore esterno; `className` resta sul `<pre>` */
    wrapperClassName?: string
    id?: string
}

/**
 * Blocco di codice non modificabile, con copia opzionale.
 *
 * Il `<pre>` è raggiungibile da tastiera (`tabIndex={0}`) perché un'area che scorre
 * e non riceve focus non è navigabile da chi non usa il mouse.
 */
export const CodeBlock: React.FC<ICodeBlockProps> = ({
    code,
    label,
    copyable = false,
    copyLabel = "Copy",
    copiedLabel = "Copied",
    maxHeightClassName,
    language,
    size,
    className,
    wrapperClassName,
    id,
    dataTestId,
    ...props
}) => {
    const testId = getTestId({ dataTestId, id })

    return (
        <div className={cn("flex flex-col gap-2", wrapperClassName)}>
            {label && <p className="text-sm text-foreground-secondary">{label}</p>}
            <div className="relative">
                <pre
                    {...props}
                    id={id}
                    tabIndex={0}
                    data-language={language}
                    className={cn(codeBlockVariants({ size }), copyable && "pr-12", maxHeightClassName, className)}
                    data-testid={testId}
                >
                    <code>{code}</code>
                </pre>
                {copyable && <CopyButton value={code} label={copyLabel} copiedLabel={copiedLabel} className="absolute right-2 top-2" dataTestId={testId && `${testId}-copy`} />}
            </div>
        </div>
    )
}

CodeBlock.displayName = "CodeBlock"

export default CodeBlock
