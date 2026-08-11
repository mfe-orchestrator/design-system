# Graph Report - design-system  (2026-08-11)

## Corpus Check
- 67 files · ~10,289 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 384 nodes · 564 edges · 29 communities (18 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `34579e69`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Core UI Primitives|Core UI Primitives]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Select Component|Select Component]]
- [[_COMMUNITY_Form System & RHF Fields|Form System & RHF Fields]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Docs & CICD Pipeline|Docs & CI/CD Pipeline]]
- [[_COMMUNITY_Badge & Sidebar Navigation|Badge & Sidebar Navigation]]
- [[_COMMUNITY_Dialogs & Color Picker|Dialogs & Color Picker]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Tabs Component|Tabs Component]]
- [[_COMMUNITY_Button & Calendar Field|Button & Calendar Field]]
- [[_COMMUNITY_Dropdown Menu|Dropdown Menu]]
- [[_COMMUNITY_Table Component|Table Component]]
- [[_COMMUNITY_Card Component|Card Component]]
- [[_COMMUNITY_correctness|correctness]]
- [[_COMMUNITY_SliderField.rhf.tsx|SliderField.rhf.tsx]]
- [[_COMMUNITY_CLAUDE|CLAUDE.md]]
- [[_COMMUNITY_Atoms (Button, Badge)|Atoms (Button, Badge)]]
- [[_COMMUNITY_class-variance-authority|class-variance-authority]]
- [[_COMMUNITY_Form Fields (TextField, SelectField, ...)|Form Fields (TextField, SelectField, ...)]]
- [[_COMMUNITY_MFE Orchestrator|MFE Orchestrator]]
- [[_COMMUNITY_Navigation Components (Sidebar, NavItem)|Navigation Components (Sidebar, NavItem)]]
- [[_COMMUNITY_Primitives (Accordion, Alert, Card, Dialog, ...)|Primitives (Accordion, Alert, Card, Dialog, ...)]]
- [[_COMMUNITY_Radix UI|Radix UI]]
- [[_COMMUNITY_react-hook-form|react-hook-form]]
- [[_COMMUNITY_Tailwind CSS v4|Tailwind CSS v4]]
- [[_COMMUNITY_theme.css Design Tokens|theme.css Design Tokens]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 50 edges
2. `compilerOptions` - 20 edges
3. `formatter` - 13 edges
4. `correctness` - 12 edges
5. `formatter` - 10 edges
6. `Label` - 10 edges
7. `@mfe-orchestrator/design-system` - 9 edges
8. `rules` - 6 edges
9. `suspicious` - 6 edges
10. `scripts` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Build Job` --references--> `@mfe-orchestrator/design-system`  [INFERRED]
  .github/workflows/ci.yml → README.md
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.tsx → src/utils/styleUtils.ts
- `Build Job` --semantically_similar_to--> `Publish Job`  [INFERRED] [semantically similar]
  .github/workflows/ci.yml → .github/workflows/release.yml
- `Publish Job` --references--> `GitHub Packages Registry`  [EXTRACTED]
  .github/workflows/release.yml → README.md
- `Spinner()` --calls--> `cn()`  [EXTRACTED]
  src/components/Spinner.tsx → src/utils/styleUtils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **pnpm install/typecheck/build pipeline** — _github_workflows_ci_build_job, _github_workflows_release_publish_job, readme_design_system [INFERRED 0.95]
- **Tag-triggered release to GitHub Packages** — _github_workflows_release_release_workflow, _github_workflows_release_publish_job, readme_github_packages, _github_workflows_release_tag_driven_versioning [EXTRACTED 1.00]

## Communities (29 total, 11 thin omitted)

### Community 0 - "Core UI Primitives"
Cohesion: 0.36
Nodes (4): TextFieldProps, Input, InputProps, inputVariants

### Community 1 - "Package Metadata"
Cohesion: 0.06
Nodes (33): description, engines, node, exports, ./package.json, ./theme.css, files, import (+25 more)

### Community 2 - "Select Component"
Cohesion: 0.07
Nodes (37): CalendarField(), CalendarFieldProps, SelectFieldProps, Spinner(), SpinnerProps, AccordionContent, AccordionItem, AccordionTrigger (+29 more)

### Community 3 - "Form System & RHF Fields"
Cohesion: 0.08
Nodes (17): SwitchCustomProps, TextareaChipsFieldProps, TextFieldProps, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem (+9 more)

### Community 4 - "TypeScript Config"
Cohesion: 0.08
Nodes (23): compilerOptions, allowSyntheticDefaultImports, declaration, declarationMap, emitDeclarationOnly, esModuleInterop, isolatedModules, jsx (+15 more)

### Community 5 - "Runtime Dependencies"
Cohesion: 0.08
Nodes (24): dependencies, class-variance-authority, clsx, date-fns, lucide-react, @radix-ui/react-accordion, @radix-ui/react-avatar, @radix-ui/react-checkbox (+16 more)

### Community 6 - "Docs & CI/CD Pipeline"
Cohesion: 0.13
Nodes (14): Build Job, CI Workflow, Publish Job, Release Workflow, Tag-driven Version Alignment, Contenuto, GitHub Packages Registry, Installazione (+6 more)

### Community 7 - "Badge & Sidebar Navigation"
Cohesion: 0.16
Nodes (10): Badge(), IBadgeProps, BadgeVariants, NavItem, NavItemProps, Sidebar, SidebarNavItemProps, SidebarProps (+2 more)

### Community 8 - "Dialogs & Color Picker"
Cohesion: 0.17
Nodes (12): Button, ButtonVariants, IButtonProps, ColorPickerCustomProps, DEFAULT_COLORS, DeleteConfirmationDialogProps, DialogContent, DialogDescription (+4 more)

### Community 9 - "Dev Dependencies"
Cohesion: 0.15
Nodes (13): devDependencies, @biomejs/biome, react, react-dom, react-hook-form, @types/node, @types/react, @types/react-dom (+5 more)

### Community 10 - "Tabs Component"
Cohesion: 0.23
Nodes (7): TabsList, tabsListVariants, TabsTrigger, tabsTriggerVariants, Tabs, TabsContext, TabsProps

### Community 11 - "Button & Calendar Field"
Cohesion: 0.05
Nodes (40): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+32 more)

### Community 12 - "Dropdown Menu"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 13 - "Table Component"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 14 - "Card Component"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 16 - "correctness"
Cohesion: 0.07
Nodes (30): noArguments, noExtraBooleanCast, noUselessCatch, noUselessTypeConstraint, noConstantCondition, noConstAssign, noPrecisionLoss, noSelfAssign (+22 more)

### Community 17 - "SliderField.rhf.tsx"
Cohesion: 0.21
Nodes (8): SliderFieldProps, Slider, SliderProps, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

## Knowledge Gaps
- **228 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+223 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Select Component` to `Core UI Primitives`, `Form System & RHF Fields`, `Badge & Sidebar Navigation`, `Dialogs & Color Picker`, `Tabs Component`, `Dropdown Menu`, `Table Component`, `Card Component`, `SliderField.rhf.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `rules` connect `correctness` to `Button & Calendar Field`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _229 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Select Component` be split into smaller, more focused modules?**
  _Cohesion score 0.06994047619047619 - nodes in this community are weakly interconnected._
- **Should `Form System & RHF Fields` be split into smaller, more focused modules?**
  _Cohesion score 0.08374384236453201 - nodes in this community are weakly interconnected._