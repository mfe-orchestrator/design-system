import React from "react"
import { cn } from "@/utils/styleUtils"
import { navItemVariants } from "./NavItemVariants"

export interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement> {
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
    ({ href, icon, name, active = false, isSidebarCollapsed, disabled = false, type = "main", action, className, isMobile, setIsMenuVisible, renderLink, ...props }, ref) => {
        const disabledClasses = "opacity-50 cursor-not-allowed hover:border-transparent"

        const content = (
            <>
                {icon}
                {!isSidebarCollapsed && <span>{name}</span>}
            </>
        )

        if (disabled) {
            return (
                <div ref={ref as React.Ref<HTMLDivElement>} className={cn(navItemVariants({ type, active }), disabledClasses, className)} {...props}>
                    {content}
                </div>
            )
        }

        if (type === "secondary") {
            if (href) {
                return (
                    <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target="_blank" rel="noreferrer" className={cn(navItemVariants({ type, active, isSidebarCollapsed }), className)} {...props}>
                        {content}
                    </a>
                )
            }
            return (
                <button ref={ref as React.Ref<HTMLButtonElement>} onClick={action} className={cn(navItemVariants({ type, active, isSidebarCollapsed }), className)} {...props}>
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
            <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={linkClassName} onClick={handleClick} {...props}>
                {content}
            </a>
        )
    }
)

NavItem.displayName = "NavItem"
