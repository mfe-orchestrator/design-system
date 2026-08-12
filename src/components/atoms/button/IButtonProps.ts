import { VariantProps } from "class-variance-authority"
import { TestIdProps } from "@/utils/testIdUtils"
import { ButtonVariants } from "./ButtonVariants"

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, VariantProps<typeof ButtonVariants>, TestIdProps {
    asChild?: boolean
    href?: string
    disabled?: boolean
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
