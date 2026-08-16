import { cva } from "class-variance-authority"

const baseStyle = `
	bg-muted
	text-foreground
	font-mono
	rounded-md
	overflow-auto
	whitespace-pre
	focus-visible:outline-none
	focus-visible:ring-2
	focus-visible:ring-ring
	focus-visible:ring-offset-2
`

export const codeBlockVariants = cva(baseStyle, {
    variants: {
        size: {
            default: "p-4 text-sm",
            sm: "p-3 text-xs"
        }
    },
    defaultVariants: {
        size: "default"
    }
})
