import React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { navItemVariants } from "./NavItemVariants"

export interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>, TestIdProps {
    type?: "main" | "secondary"
    href?: string
    icon?: React.ReactNode
    name?: string
    action?: () => void
    active?: boolean
    isSidebarCollapsed?: boolean
    disabled?: boolean
    isMobile?: boolean
    setIsMenuVisible?: (value: boolean) => void
    /** Renderer opzionale per integrare un router (es. react-router Link) */
    renderLink?: (props: { href: string; className: string; children: React.ReactNode; onClick?: () => void }) => React.ReactElement
}

export const NavItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, NavItemProps>(
    ({ href, icon, name, active = false, isSidebarCollapsed, disabled = false, type = "main", action, className, isMobile, setIsMenuVisible, renderLink, dataTestId, id, ...props }, ref) => {
        const disabledClasses = "opacity-50 cursor-not-allowed hover:border-transparent"
        const testId = getTestId({ dataTestId, id, name })

        // Quando la sidebar è compressa l'etichetta non è visibile: senza `sr-only`
        // resterebbe un controllo con la sola icona e nessun nome accessibile.
        const content = (
            <>
                {icon}
                {isSidebarCollapsed ? <span className="sr-only">{name}</span> : <span>{name}</span>}
            </>
        )

        if (disabled) {
            return (
                // Un anchor senza `href` non è raggiungibile da tastiera: è il modo corretto
                // di rappresentare una voce di navigazione disattivata.
                <a
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    role="link"
                    aria-disabled="true"
                    tabIndex={-1}
                    aria-current={active ? "page" : undefined}
                    id={id}
                    className={cn(navItemVariants({ type, active, isSidebarCollapsed }), disabledClasses, className)}
                    {...props}
                    data-testid={testId}
                >
                    {content}
                </a>
            )
        }

        if (type === "secondary") {
            if (href) {
                return (
                    <a
                        ref={ref as React.Ref<HTMLAnchorElement>}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-current={active ? "page" : undefined}
                        id={id}
                        className={cn(navItemVariants({ type, active, isSidebarCollapsed }), className)}
                        {...props}
                        data-testid={testId}
                    >
                        {content}
                    </a>
                )
            }
            return (
                <button
                    ref={ref as React.Ref<HTMLButtonElement>}
                    type="button"
                    onClick={action}
                    id={id}
                    className={cn(navItemVariants({ type, active, isSidebarCollapsed }), className)}
                    {...props}
                    data-testid={testId}
                >
                    {content}
                </button>
            )
        }

        const linkClassName = cn(navItemVariants({ type, active, isSidebarCollapsed }), className)
        const handleClick = () => {
            if (isMobile) setIsMenuVisible?.(false)
        }

        if (renderLink && href) {
            return renderLink({ href, className: linkClassName, children: content, onClick: handleClick })
        }

        return (
            <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} aria-current={active ? "page" : undefined} id={id} className={linkClassName} onClick={handleClick} {...props} data-testid={testId}>
                {content}
            </a>
        )
    }
)

NavItem.displayName = "NavItem"
