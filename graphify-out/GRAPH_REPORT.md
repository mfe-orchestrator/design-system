# Graph Report - .  (2026-08-05)

## Corpus Check
- Corpus is ~8,884 words - fits in a single context window. You may not need a graph.

## Summary
- 293 nodes · 477 edges · 16 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 39,476 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 49 edges
2. `compilerOptions` - 21 edges
3. `@mfe-orchestrator/design-system` - 13 edges
4. `Label` - 9 edges
5. `scripts` - 6 edges
6. `SelectContext` - 6 edges
7. `exports` - 5 edges
8. `Button` - 5 edges
9. `Publish Job` - 5 edges
10. `DialogHeader()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Build Job` --references--> `@mfe-orchestrator/design-system`  [INFERRED]
  .github/workflows/ci.yml → README.md
- `@mfe-orchestrator/design-system` --references--> `Release Workflow`  [EXTRACTED]
  README.md → .github/workflows/release.yml
- `Publish Job` --references--> `GitHub Packages Registry`  [EXTRACTED]
  .github/workflows/release.yml → README.md
- `CalendarField()` --calls--> `cn()`  [EXTRACTED]
  src/components/input/CalendarField.rhf.tsx → src/utils/styleUtils.ts
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.tsx → src/utils/styleUtils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **pnpm install/typecheck/build pipeline** — _github_workflows_ci_build_job, _github_workflows_release_publish_job, readme_design_system [INFERRED 0.95]
- **Tag-triggered release to GitHub Packages** — _github_workflows_release_release_workflow, _github_workflows_release_publish_job, readme_github_packages, _github_workflows_release_tag_driven_versioning [EXTRACTED 1.00]

## Communities (16 total, 0 thin omitted)

### Community 0 - "Core UI Primitives"
Cohesion: 0.07
Nodes (27): TextFieldProps, Spinner(), SpinnerProps, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription (+19 more)

### Community 1 - "Package Metadata"
Cohesion: 0.06
Nodes (33): description, engines, node, exports, ./package.json, ./theme.css, files, import (+25 more)

### Community 2 - "Select Component"
Cohesion: 0.14
Nodes (15): SelectFieldProps, SelectContent, selectContentVariants, SelectItem, selectItemVariants, SelectLabel, selectLabelVariants, SelectScrollDownButton (+7 more)

### Community 3 - "Form System & RHF Fields"
Cohesion: 0.08
Nodes (17): SwitchCustomProps, TextareaChipsFieldProps, TextFieldProps, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem (+9 more)

### Community 4 - "TypeScript Config"
Cohesion: 0.08
Nodes (24): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, declarationMap, emitDeclarationOnly, esModuleInterop, isolatedModules (+16 more)

### Community 5 - "Runtime Dependencies"
Cohesion: 0.09
Nodes (23): dependencies, class-variance-authority, clsx, date-fns, lucide-react, @radix-ui/react-accordion, @radix-ui/react-avatar, @radix-ui/react-checkbox (+15 more)

### Community 6 - "Docs & CI/CD Pipeline"
Cohesion: 0.15
Nodes (17): Build Job, CI Workflow, Publish Job, Release Workflow, Tag-driven Version Alignment, Atoms (Button, Badge), class-variance-authority, @mfe-orchestrator/design-system (+9 more)

### Community 7 - "Badge & Sidebar Navigation"
Cohesion: 0.18
Nodes (9): Badge(), IBadgeProps, BadgeVariants, NavItem, NavItemProps, navItemVariants, Sidebar, SidebarNavItemProps (+1 more)

### Community 8 - "Dialogs & Color Picker"
Cohesion: 0.21
Nodes (10): Button, ColorPickerCustomProps, DEFAULT_COLORS, DeleteConfirmationDialogProps, DialogContent, DialogDescription, DialogFooter(), DialogHeader() (+2 more)

### Community 9 - "Dev Dependencies"
Cohesion: 0.17
Nodes (12): devDependencies, @biomejs/biome, react, react-dom, react-hook-form, @types/node, @types/react, @types/react-dom (+4 more)

### Community 10 - "Tabs Component"
Cohesion: 0.23
Nodes (7): TabsList, tabsListVariants, TabsTrigger, tabsTriggerVariants, Tabs, TabsContext, TabsProps

### Community 11 - "Button & Calendar Field"
Cohesion: 0.31
Nodes (5): ButtonVariants, IButtonProps, CalendarField(), CalendarFieldProps, PopoverContent

### Community 12 - "Dropdown Menu"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 13 - "Table Component"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 14 - "Card Component"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

## Knowledge Gaps
- **161 isolated node(s):** `name`, `version`, `description`, `license`, `type` (+156 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Core UI Primitives` to `Select Component`, `Form System & RHF Fields`, `Badge & Sidebar Navigation`, `Dialogs & Color Picker`, `Tabs Component`, `Button & Calendar Field`, `Dropdown Menu`, `Table Component`, `Card Component`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _162 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core UI Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.07084785133565621 - nodes in this community are weakly interconnected._
- **Should `Package Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Select Component` be split into smaller, more focused modules?**
  _Cohesion score 0.14039408866995073 - nodes in this community are weakly interconnected._