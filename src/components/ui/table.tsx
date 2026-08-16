import * as React from "react"

import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

type TableProps = React.HTMLAttributes<HTMLTableElement> &
    TestIdProps & {
        /** Nome accessibile del contenitore scrollabile della tabella */
        scrollAreaLabel?: string
        /** Racchiude la tabella nella cornice arrotondata usata dalle pagine di elenco */
        framed?: boolean
        /** Come la cornice tratta una tabella più larga del contenitore: `clip` la taglia, `x` la fa scorrere. Ha effetto solo con `framed`. */
        scroll?: "clip" | "x"
    }

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, dataTestId, scrollAreaLabel, framed = false, scroll = "clip", ...props }, ref) => {
    const regionLabel = scrollAreaLabel ?? props["aria-label"]
    // Il wrapper scrollabile diventa una region raggiungibile da tastiera (WCAG 2.1.1)
    // solo quando ha un nome accessibile: una region anonima e focusabile è rumore per gli screen reader.
    const regionProps = regionLabel ? ({ role: "region", "aria-label": regionLabel, tabIndex: 0 } as const) : {}

    const scrollArea = (
        <div className="relative w-full overflow-auto" {...regionProps}>
            <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
        </div>
    )

    if (!framed) return scrollArea

    // La cornice è un div esterno e non classi aggiunte al contenitore scrollabile:
    // `overflow-hidden` sullo stesso elemento annullerebbe lo scorrimento delle tabelle larghe.
    return <div className={cn("rounded-md border-2 border-border", scroll === "x" ? "overflow-x-auto" : "overflow-hidden")}>{scrollArea}</div>
})
Table.displayName = "Table"

/** Segnala alle righe che si trovano nell'intestazione, dove il fondo colorato è il default. */
const TableHeaderContext = React.createContext(false)

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> &
    TestIdProps & {
        /** Fondo colorato sulla riga di intestazione: `false` per le tabelle che vogliono un'intestazione neutra */
        tinted?: boolean
    }

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, dataTestId, tinted = true, ...props }, ref) => (
    <TableHeaderContext.Provider value={tinted}>
        <thead ref={ref} className={cn("[&_tr]:border-b-2", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
    </TableHeaderContext.Provider>
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement> & TestIdProps>(({ className, dataTestId, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement> & TestIdProps>(({ className, dataTestId, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement> & TestIdProps>(({ className, dataTestId, ...props }, ref) => {
    const tinted = React.useContext(TableHeaderContext)

    // La tinta precede `className`: chi passa un altro sfondo (es. `bg-muted/60`) continua a vincere via twMerge.
    return (
        <tr ref={ref} className={cn("border-b transition-colors data-[state=selected]:bg-muted", tinted && "bg-primary/25", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
    )
})
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement> & TestIdProps>(({ className, dataTestId, scope = "col", ...props }, ref) => (
    <th
        ref={ref}
        scope={scope}
        // Colore esplicito e non ereditato: sul fondo colorato dell'intestazione il testo deve restare leggibile
        // anche quando la tabella sta dentro un contenitore smorzato.
        className={cn("h-12 px-4 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0", className)}
        {...props}
        data-testid={getTestId({ dataTestId, ...props })}
    />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement> & TestIdProps>(({ className, dataTestId, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement> & TestIdProps>(({ className, dataTestId, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} data-testid={getTestId({ dataTestId, ...props })} />
))
TableCaption.displayName = "TableCaption"

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
