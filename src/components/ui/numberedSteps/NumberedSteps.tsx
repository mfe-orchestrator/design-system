import type { VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/utils/styleUtils"
import { getTestId, type TestIdProps } from "@/utils/testIdUtils"
import { numberedStepMarkerVariants } from "./numberedStepsVariants"

export interface INumberedStep {
    title: React.ReactNode
    description?: React.ReactNode
}

export interface INumberedStepsProps extends Omit<React.HTMLAttributes<HTMLOListElement>, "children">, VariantProps<typeof numberedStepMarkerVariants>, TestIdProps {
    steps: INumberedStep[]
    /** Numero del primo passo, per spezzare una procedura lunga in più blocchi */
    startAt?: number
    id?: string
}

/**
 * Procedura numerata: pallino con il numero, titolo del passo e spiegazione.
 *
 * L'ordine lo porta l'`<ol>` (con `start`, così un blocco che riprende da metà procedura
 * resta corretto anche senza CSS); i numeri disegnati sono `aria-hidden`, altrimenti
 * ogni passo verrebbe annunciato con il proprio numero due volte.
 */
export const NumberedSteps: React.FC<INumberedStepsProps> = ({ steps, tone, startAt = 1, className, id, dataTestId, ...props }) => {
    const testId = getTestId({ dataTestId, id })

    return (
        <ol {...props} id={id} start={startAt} className={cn("flex list-none flex-col gap-3", className)} data-testid={testId}>
            {steps.map((step, index) => {
                const stepNumber = startAt + index

                return (
                    <li key={stepNumber} className="flex items-start gap-3">
                        <span aria-hidden="true" className={numberedStepMarkerVariants({ tone })}>
                            {stepNumber}
                        </span>
                        <div className="min-w-0">
                            <p className="font-medium text-foreground">{step.title}</p>
                            {step.description && <p className="text-sm text-foreground-secondary">{step.description}</p>}
                        </div>
                    </li>
                )
            })}
        </ol>
    )
}

NumberedSteps.displayName = "NumberedSteps"

export default NumberedSteps
