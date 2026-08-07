import { VariantProps } from "class-variance-authority"
import { ButtonVariants } from "./ButtonVariants"

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, VariantProps<typeof ButtonVariants> {
    asChild?: boolean
    href?: string
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    dataTestId?: string
    /**
     * Renderer opzionale usato quando è presente `href`, per integrare il router
     * dell'applicazione (es. il Link di react-router) al posto dell'anchor nativo.
     */
    renderLink?: (props: { href: string; className: string; children?: React.ReactNode; id?: string; dataTestId?: string }) => React.ReactElement
}
