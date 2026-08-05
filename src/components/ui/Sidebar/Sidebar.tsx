import { ArrowLeftFromLine, ArrowRightFromLine, Menu } from "lucide-react"
import * as React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/atoms"
import { cn } from "@/utils/styleUtils"
import { NavItem, NavItemProps } from "./partials/NavItem/NavItem"

export interface SidebarNavItemProps {
    name?: string
    path?: string
    icon?: React.ReactNode
    disabled?: boolean
    active?: boolean
    action?: () => void
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    isCollapsed?: boolean
    toggleCollapsed?: () => void
    /** Titolo mostrato accanto al logo */
    title?: string
    /** Logo custom; in mancanza viene mostrato il quadrato brand di default */
    logo?: React.ReactNode
    sidebarHeader?: React.ReactNode | React.ReactNode[]
    mainNavItems?: SidebarNavItemProps[]
    /** Voci secondarie (es. link a documentazione) mostrate sopra il footer */
    secondaryNavItems?: SidebarNavItemProps[]
    /** Contenuto libero nel footer (es. user menu, theme toggle) */
    footer?: React.ReactNode
    /** Renderer opzionale per integrare un router nelle voci di navigazione */
    renderLink?: NavItemProps["renderLink"]
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
    ({ className, title, logo, sidebarHeader, mainNavItems, secondaryNavItems, footer, isCollapsed, toggleCollapsed, renderLink, ...props }, ref) => {
        const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches)
        const [isMenuVisible, setIsMenuVisible] = useState(false)

        useEffect(() => {
            const onResize = () => {
                setIsMobile(window.matchMedia("(max-width: 767px)").matches)
                setIsMenuVisible(false)
            }
            window.addEventListener("resize", onResize)
            return () => window.removeEventListener("resize", onResize)
        }, [])

        useEffect(() => {
            if (isMobile && isMenuVisible) {
                document.querySelector("#main_content")?.classList.add("hidden")
            } else {
                document.querySelector("#main_content")?.classList.remove("hidden")
            }
        }, [isMobile, isMenuVisible])

        const navBarStyle = `
		w-[calc(100%-1rem)] p-4 sticky top-2 start-2 z-10 bg-sidebar h-fit flex flex-col transition-all duration-300 ease-in-out border-2 border-sidebar-border rounded-md
	`

        const sidebarStyle = `md:h-sidebar md:py-6 group ${!isCollapsed ? "md:w-64 md:px-3" : "md:w-20 md:px-2"}`

        return (
            <div ref={ref} id="sidebar_container" className={cn(navBarStyle, sidebarStyle, isMenuVisible && "h-sidebar", className)} {...props}>
                <div className={`flex items-center justify-between md:mb-12 ${isCollapsed ? "md:justify-center" : "md:justify-start"}`}>
                    <div className="flex items-center md:p-2 gap-3">
                        {logo ?? (
                            <div className="h-8 w-8 rounded-sm bg-orchestrator-accent flex items-center justify-center text-white font-bold">{!isCollapsed ? "MF" : "M"}</div>
                        )}
                        {!isCollapsed && title && <span className="text-lg font-semibold text-orchestrator-secondary">{title}</span>}
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuVisible(!isMenuVisible)}>
                        <Menu />
                    </Button>
                </div>

                {sidebarHeader}

                <div
                    id="sidebar_menu"
                    className={`${isMenuVisible ? "flex" : "hidden"} flex-col flex-grow border-t border-divider overflow-auto md:flex md:border-0 pt-2 md:pt-0 mt-4 md:mt-0`}
                >
                    {mainNavItems && (
                        <nav className="flex flex-col gap-1 flex-grow">
                            {mainNavItems.map(item => (
                                <NavItem
                                    key={item.path ?? item.name}
                                    type="main"
                                    href={item.path}
                                    icon={item.icon}
                                    name={item.name}
                                    active={item.active}
                                    isSidebarCollapsed={isCollapsed}
                                    disabled={item.disabled}
                                    isMobile={isMobile}
                                    setIsMenuVisible={setIsMenuVisible}
                                    renderLink={renderLink}
                                />
                            ))}
                        </nav>
                    )}

                    {secondaryNavItems && secondaryNavItems.length > 0 && (
                        <div className="flex flex-col gap-1 border-t border-divider py-2">
                            {secondaryNavItems.map(item => (
                                <NavItem
                                    key={item.path ?? item.name}
                                    type="secondary"
                                    href={item.path}
                                    icon={item.icon}
                                    name={item.name}
                                    action={item.action}
                                    isSidebarCollapsed={isCollapsed}
                                />
                            ))}
                        </div>
                    )}

                    {footer && <div className="border-t border-divider pt-2">{footer}</div>}
                </div>

                <Button
                    variant="secondary"
                    size="icon-sm"
                    tabIndex={0}
                    onClick={toggleCollapsed}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 [&_svg]:size-4 invisible group-hover:visible group-focus-within:visible hidden md:inline-flex"
                >
                    {!isCollapsed ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
                </Button>
            </div>
        )
    }
)

Sidebar.displayName = "Sidebar"

export { Sidebar }
