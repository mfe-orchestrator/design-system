import { ArrowLeftFromLine, ArrowRightFromLine, Menu } from "lucide-react"
import * as React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/atoms"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { NavItem, NavItemProps } from "./partials/NavItem/NavItem"

export interface SidebarNavItemProps {
    name?: string
    path?: string
    icon?: React.ReactNode
    disabled?: boolean
    active?: boolean
    action?: () => void
    dataTestId?: string
}

/** Stato interno della sidebar passato agli slot liberi */
export interface SidebarSlotState {
    isCollapsed?: boolean
    isMobile: boolean
}

/**
 * Uno slot accetta un nodo, oppure una funzione se il contenuto deve reagire allo
 * stato che vive dentro la sidebar (collasso e viewport mobile).
 */
export type SidebarSlot = React.ReactNode | ((state: SidebarSlotState) => React.ReactNode)

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, TestIdProps {
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
    /**
     * Contenuto libero nel blocco secondario, sopra le secondaryNavItems: serve ai
     * comandi che non sono voci di navigazione (selettore lingua, toggle tema).
     */
    secondaryContent?: SidebarSlot
    /** Contenuto libero nel footer (es. user menu) */
    footer?: SidebarSlot
    /** Renderer opzionale per integrare un router nelle voci di navigazione */
    renderLink?: NavItemProps["renderLink"]
    /** Nome accessibile della navigazione principale */
    mainNavLabel?: string
    /** Nome accessibile della navigazione secondaria */
    secondaryNavLabel?: string
    /** Nome accessibile del bottone che apre/chiude il menu su mobile */
    menuButtonLabel?: string
    /** Nome accessibile del bottone che espande la sidebar */
    expandButtonLabel?: string
    /** Nome accessibile del bottone che comprime la sidebar */
    collapseButtonLabel?: string
}

const renderSlot = (slot: SidebarSlot | undefined, state: SidebarSlotState): React.ReactNode => (typeof slot === "function" ? slot(state) : slot)

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
    (
        {
            className,
            title,
            logo,
            sidebarHeader,
            mainNavItems,
            secondaryNavItems,
            secondaryContent,
            footer,
            isCollapsed,
            toggleCollapsed,
            renderLink,
            dataTestId,
            id = "sidebar_container",
            mainNavLabel = "Main",
            secondaryNavLabel = "Secondary",
            menuButtonLabel = "Toggle navigation menu",
            expandButtonLabel = "Expand sidebar",
            collapseButtonLabel = "Collapse sidebar",
            ...props
        },
        ref
    ) => {
        const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches)
        const [isMenuVisible, setIsMenuVisible] = useState(false)
        const testId = getTestId({ dataTestId, id, ...props })

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

        const slotState: SidebarSlotState = { isCollapsed, isMobile }

        return (
            <div ref={ref} id={id} className={cn(navBarStyle, sidebarStyle, isMenuVisible && "h-sidebar", className)} {...props} data-testid={testId}>
                <div className={`flex items-center justify-between md:mb-12 ${isCollapsed ? "md:justify-center" : "md:justify-start"}`}>
                    <div className="flex items-center md:p-2 gap-3">
                        {logo ?? (
                            <div className="h-8 w-8 rounded-sm bg-orchestrator-accent flex items-center justify-center text-white font-bold" aria-hidden="true">
                                {!isCollapsed ? "MF" : "M"}
                            </div>
                        )}
                        {!isCollapsed && title && <span className="text-lg font-semibold text-orchestrator-secondary">{title}</span>}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label={menuButtonLabel}
                        aria-expanded={isMenuVisible}
                        aria-controls="sidebar_menu"
                        dataTestId={`${testId}-menu-toggle`}
                        onClick={() => setIsMenuVisible(!isMenuVisible)}
                    >
                        <Menu aria-hidden="true" focusable="false" />
                    </Button>
                </div>

                {sidebarHeader}

                <div id="sidebar_menu" className={`${isMenuVisible ? "flex" : "hidden"} flex-col flex-grow border-t border-divider overflow-auto md:flex md:border-0 pt-2 md:pt-0 mt-4 md:mt-0`}>
                    {mainNavItems && (
                        <nav className="flex flex-col gap-1 flex-grow" aria-label={mainNavLabel}>
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
                                    dataTestId={item.dataTestId}
                                />
                            ))}
                        </nav>
                    )}

                    {(secondaryContent || (secondaryNavItems && secondaryNavItems.length > 0)) && (
                        <div className="flex flex-col gap-1 border-t border-divider py-2">
                            {renderSlot(secondaryContent, slotState)}
                            {secondaryNavItems && secondaryNavItems.length > 0 && (
                                <nav className="flex flex-col gap-1" aria-label={secondaryNavLabel}>
                                    {secondaryNavItems.map(item => (
                                        <NavItem
                                            key={item.path ?? item.name}
                                            type="secondary"
                                            href={item.path}
                                            icon={item.icon}
                                            name={item.name}
                                            action={item.action}
                                            isSidebarCollapsed={isCollapsed}
                                            dataTestId={item.dataTestId}
                                        />
                                    ))}
                                </nav>
                            )}
                        </div>
                    )}

                    {footer && <div className="border-t border-divider pt-2">{renderSlot(footer, slotState)}</div>}
                </div>

                <Button
                    variant="secondary"
                    size="icon-sm"
                    tabIndex={0}
                    onClick={toggleCollapsed}
                    aria-label={isCollapsed ? expandButtonLabel : collapseButtonLabel}
                    aria-expanded={!isCollapsed}
                    aria-controls="sidebar_menu"
                    dataTestId={`${testId}-collapse-toggle`}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 [&_svg]:size-4 invisible group-hover:visible group-focus-within:visible focus-visible:visible hidden md:inline-flex"
                >
                    {!isCollapsed ? <ArrowLeftFromLine aria-hidden="true" focusable="false" /> : <ArrowRightFromLine aria-hidden="true" focusable="false" />}
                </Button>
            </div>
        )
    }
)

Sidebar.displayName = "Sidebar"

export { Sidebar }
