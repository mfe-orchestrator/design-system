/**
 * Props condivise da tutti i componenti del design system per pilotare l'attributo `data-testid`.
 */
export interface TestIdProps {
    /**
     * Valore esplicito per l'attributo `data-testid`.
     * Se non viene passato si usa come fallback `id` e, in mancanza, `name`.
     */
    dataTestId?: string
}

export type TestIdSource = TestIdProps & {
    "data-testid"?: string
    id?: string
    name?: string
    // Permette di passare direttamente l'oggetto delle props del componente
    [key: string]: unknown
}

/**
 * Risolve il valore di `data-testid` con questo ordine di priorità:
 * `data-testid` -> `dataTestId` -> `id` -> `name`.
 *
 * Restituisce `undefined` quando nessuna delle fonti è valorizzata, così React
 * non emette l'attributo nel markup.
 *
 * @example
 * <input {...props} data-testid={getTestId({ dataTestId, ...props })} />
 */
export function getTestId(source: TestIdSource = {}): string | undefined {
    return source["data-testid"] || source.dataTestId || source.id || source.name || undefined
}
