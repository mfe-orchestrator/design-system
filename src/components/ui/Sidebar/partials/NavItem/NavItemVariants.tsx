import { cva } from "class-variance-authority"
import { cn } from "@/utils/styleUtils"

const baseStyle = `
	w-full
	font-medium
	flex
	items-center
	gap-2
	py-2.5
	rounded-sm
	transition-colors
	border-2
	hover:border-accent/25
	focus-visible:outline-none
	focus-visible:ring-4
	focus-visible:ring-accent/25
	focus-visible:ring-offset-2
`

// `:not(.sr-only)` evita che l'etichetta riservata agli screen reader,
// usata quando la sidebar è compressa, venga resa di nuovo visibile.
const labelStyle = `
	[&>span:not(.sr-only)]:w-full
	[&>span:not(.sr-only)]:text-start
	[&>span:not(.sr-only)]:overflow-hidden
	[&>span:not(.sr-only)]:text-ellipsis
`

export const navItemVariants = cva(cn(baseStyle, labelStyle), {
    variants: {
        type: {
            main: "text-base text-foreground px-4 [&_svg]:size-5",
            secondary: "text-sm text-foreground-secondary px-3 [&_svg]:size-4"
        },
        active: {
            true: "border-accent hover:border-accent",
            false: "border-transparent"
        },
        isSidebarCollapsed: {
            true: "justify-center",
            false: "justify-start"
        }
    }
})
