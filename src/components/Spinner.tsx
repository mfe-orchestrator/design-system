import { Loader2 } from "lucide-react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"

type SpinnerProps = TestIdProps & {
    className?: string
    size?: number
    centerScreen?: boolean
    id?: string
    /** Testo annunciato dagli screen reader mentre il caricamento è in corso */
    label?: string
}

const Spinner = ({ className, size = 24, centerScreen = true, id, dataTestId, label = "Loading…" }: SpinnerProps) => {
    const testId = getTestId({ dataTestId, id })

    const spinner = <Loader2 className={cn("animate-spin", className)} size={size} aria-hidden="true" focusable="false" />

    return (
        <div id={id} data-testid={testId} role="status" aria-live="polite" aria-busy="true" className={centerScreen ? "flex-1 flex items-center justify-center" : "inline-flex"}>
            {spinner}
            <span className="sr-only">{label}</span>
        </div>
    )
}

export default Spinner
