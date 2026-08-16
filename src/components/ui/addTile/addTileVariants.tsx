import { cva } from "class-variance-authority"
import { cn } from "@/utils/styleUtils"

const baseStyle = `
	flex
	w-full
	flex-col
	items-center
	justify-center
	gap-2
	rounded-lg
	border-2
	border-dashed
	border-divider
	text-center
	transition-colors
`

const hoverStyle = `
	hover:border-primary
	hover:bg-primary/5
`

const focusStyle = `
	focus:outline-none
	focus-visible:ring-2
	focus-visible:ring-ring
	focus-visible:ring-offset-2
`

const disabledStyle = `
	disabled:cursor-not-allowed
	disabled:opacity-75
	disabled:hover:border-divider
	disabled:hover:bg-transparent
`

export const addTileVariants = cva(cn(baseStyle, hoverStyle, focusStyle, disabledStyle), {
    variants: {
        /**
         * `square` è per le griglie di tessere affiancate, `auto` per le colonne di card.
         * La spaziatura segue la forma: dentro un quadrato di ~180px il padding pieno
         * lascerebbe al testo meno spazio dell'icona.
         */
        aspect: {
            square: "aspect-square p-3",
            auto: "h-full min-h-[180px] p-6"
        }
    },
    defaultVariants: {
        aspect: "auto"
    }
})
