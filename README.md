# @mfe-orchestrator/design-system

Design System for MFE Orchestrator. Libreria React di componenti UI estratti dal frontend di [mfe-orchestrator](https://github.com/mfe-orchestrator), basata su Radix UI, Tailwind CSS v4 e class-variance-authority.

## Contenuto

- **Atoms**: `Button`, `Badge`
- **Primitives**: `Accordion`, `Alert`, `Avatar`, `Card`, `Checkbox`, `Dialog`, `DropdownMenu`, `Form`, `Input`, `Label`, `Popover`, `RadioGroup`, `Select`, `Slider`, `Switch`, `Table`, `Tabs`, `Textarea`, `Toggle`, `ToggleGroup`, `Tooltip`, `Spinner`, `DeleteConfirmationDialog`
- **Navigation**: `Sidebar`, `NavItem` (agnostici rispetto al router: prop `renderLink` per integrare react-router)
- **Form fields** (react-hook-form): `TextField`, `TextareaField`, `TextareaChipsField`, `SelectField`, `SwitchField`, `SliderField`, `CalendarField`, `ColorPicker`
- **Theme**: `theme.css` con i design token (light/dark) per Tailwind v4

## Installazione

Il pacchetto è pubblicato su GitHub Packages. Nel progetto consumer crea un `.npmrc`:

```
@mfe-orchestrator:registry=https://npm.pkg.github.com
```

poi:

```sh
pnpm add @mfe-orchestrator/design-system
pnpm add -D tailwindcss @tailwindcss/vite tailwindcss-animate
```

## Setup Tailwind (v4)

Nel CSS principale dell'app:

```css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..700;1,300..700&display=swap");
@import "tailwindcss";
@import "@mfe-orchestrator/design-system/theme.css";
@source "../node_modules/@mfe-orchestrator/design-system/dist";
```

La direttiva `@source` fa sì che Tailwind generi le utility usate dai componenti della libreria. Il dark mode è class-based: aggiungi/rimuovi la classe `dark` su `<html>`.

## Uso

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@mfe-orchestrator/design-system"

export function Example() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Hello</CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant="primary">Click me</Button>
            </CardContent>
        </Card>
    )
}
```

I form field richiedono un `FormProvider` di react-hook-form:

```tsx
import { FormProvider, useForm } from "react-hook-form"
import { TextField } from "@mfe-orchestrator/design-system"

export function ExampleForm() {
    const form = useForm()
    return (
        <FormProvider {...form}>
            <TextField name="email" label="Email" />
        </FormProvider>
    )
}
```

## Test id

Ogni componente espone un `data-testid` risolto automaticamente con questa priorità:

1. `data-testid` passato direttamente come attributo HTML
2. prop `dataTestId`
3. prop `id`
4. prop `name` (dove esiste: input, textarea, switch, slider, form field)

Se nessuna delle fonti è valorizzata l'attributo non viene emesso, così il markup resta pulito.

```tsx
<Button dataTestId="save">Salva</Button>   // data-testid="save"
<Button id="save">Salva</Button>           // data-testid="save"
<Input name="email" />                     // data-testid="email"
<Button>Salva</Button>                     // nessun data-testid
```

I componenti composti derivano i test id dei sotto-elementi dal valore risolto: `SelectField` con
`name="country"` genera `country`, `country-clear` e `country-option-<value>`; `SliderField` con
`name="level"` genera `level`, `level-slider`, `level-value` e `level-preset-<n>`; i campi segreto
espongono `<name>-toggle-visibility`.

La stessa logica è esportata come helper per i componenti dell'app consumer:

```tsx
import { getTestId, type TestIdProps } from "@mfe-orchestrator/design-system"

const MyField = ({ dataTestId, ...props }: MyFieldProps & TestIdProps) => (
    <input {...props} data-testid={getTestId({ dataTestId, ...props })} />
)
```

## Accessibilità

I componenti puntano alla conformità WCAG 2.1 AA:

- ogni controllo interattivo è un elemento nativo (`button`, `a`, `input`) raggiungibile da tastiera, con focus ring visibile;
- i campi form associano label, descrizione ed errore tramite `htmlFor`/`id`, `aria-describedby`, `aria-invalid` e `aria-required`; i messaggi di errore hanno `role="alert"`;
- l'asterisco dei campi obbligatori è `aria-hidden` ed è affiancato da un testo per screen reader;
- le icone decorative sono `aria-hidden`; i controlli con la sola icona richiedono un `aria-label`;
- le stringhe annunciate dagli screen reader sono personalizzabili via prop (`label`, `clearLabel`, `closeLabel`, `menuButtonLabel`, `showValueLabel`, `requiredLabel`, …) per essere localizzate dall'app consumer.

## Sviluppo

```sh
pnpm install
pnpm build        # build libreria (dist/)
pnpm dev          # build in watch mode
pnpm typecheck
```

Per usare la libreria in locale da un altro progetto senza pubblicarla:

```sh
pnpm add link:../design-system
```

## Release

La pipeline [release.yml](.github/workflows/release.yml) pubblica su GitHub Packages ad ogni tag `v*`:

```sh
git tag v0.1.0
git push origin v0.1.0
```

## License

Apache-2.0
