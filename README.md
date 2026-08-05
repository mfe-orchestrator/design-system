# @mfe-orchestrator/design-system

Design System for MFE Orchestrator. Libreria React di componenti UI estratti dal frontend di [mfe-orchestrator](https://github.com/mfe-orchestrator), basata su Radix UI, Tailwind CSS v4 e class-variance-authority.

## Contenuto

- **Atoms**: `Button`, `Badge`
- **Primitives**: `Accordion`, `Alert`, `Avatar`, `Card`, `Checkbox`, `Dialog`, `DropdownMenu`, `Form`, `Input`, `Label`, `Popover`, `RadioGroup`, `Select`, `Switch`, `Table`, `Tabs`, `Textarea`, `Toggle`, `ToggleGroup`, `Tooltip`, `Spinner`, `DeleteConfirmationDialog`
- **Navigation**: `Sidebar`, `NavItem` (agnostici rispetto al router: prop `renderLink` per integrare react-router)
- **Form fields** (react-hook-form): `TextField`, `TextareaField`, `TextareaChipsField`, `SelectField`, `SwitchField`, `CalendarField`, `ColorPicker`
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
