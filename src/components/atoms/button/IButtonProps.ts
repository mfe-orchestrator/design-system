import { VariantProps } from "class-variance-authority"
import { TestIdProps } from "@/utils/testIdUtils"
import { ButtonVariants } from "./ButtonVariants"

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, VariantProps<typeof ButtonVariants>, TestIdProps {
    asChild?: boolean
    href?: string
    disabled?: boolean
    /**
     * Stato occupato: mostra uno Spinner inline prima del contenuto e blocca l'interazione.
     * Sul rendering come link non esiste `disabled`, quindi si comporta come tale:
     * l'href viene rimosso e l'elemento esce dall'ordine di tabulazione.
     */
    loading?: boolean
    /**
     * Testo annunciato dagli screen reader mentre `loading` è attivo.
     * È l'unica etichetta sonora dello stato di caricamento: entra nel nome accessibile
     * insieme al contenuto del bottone, che quindi non va perso né duplicato.
     */
    loadingLabel?: string
    type?: "button" | "submit" | "reset"
    /** Nome accessibile: obbligatorio per i bottoni con la sola icona (`size="icon"` / `size="icon-sm"`) */
    "aria-label"?: string
    /** Solo per il rendering come link: target della navigazione */
    target?: string
    /** Solo per il rendering come link: relazione con la risorsa di destinazione */
    rel?: string
    /**
     * Renderer opzionale usato quando è presente `href`, per integrare il router
     * dell'applicazione (es. il Link di react-router) al posto dell'anchor nativo.
     */
    renderLink?: (props: { href: string; className: string; children?: React.ReactNode; id?: string; dataTestId?: string }) => React.ReactElement
}
