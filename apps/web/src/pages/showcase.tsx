import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  BellIcon,
  CheckIcon,
  DotsThreeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  GearIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  PaperPlaneTiltIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  UserIcon,
  WarningIcon,
} from "@phosphor-icons/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { AspectRatio } from "@workspace/ui/components/aspect-ratio"
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@workspace/ui/components/attachment"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@workspace/ui/components/bubble"
import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@workspace/ui/components/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { Label } from "@workspace/ui/components/label"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@workspace/ui/components/marker"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@workspace/ui/components/menubar"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@workspace/ui/components/message"
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@workspace/ui/components/message-scroller"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@workspace/ui/components/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Slider } from "@workspace/ui/components/slider"
import { Spinner } from "@workspace/ui/components/spinner"
import { Switch } from "@workspace/ui/components/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { Textarea } from "@workspace/ui/components/textarea"
import { toast } from "@workspace/ui/components/toast"
import { Toggle } from "@workspace/ui/components/toggle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@workspace/ui/components/autocomplete"
import { CheckboxGroup } from "@workspace/ui/components/checkbox-group"
import { DataTable, type ColumnDef } from "@workspace/ui/components/data-table"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@workspace/ui/components/date-picker"
import {
  FileUpload,
  FileUploadDescription,
  FileUploadIcon,
  FileUploadTitle,
} from "@workspace/ui/components/file-upload"
import { Form } from "@workspace/ui/components/form"
import { Meter, MeterLabel, MeterValue } from "@workspace/ui/components/meter"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@workspace/ui/components/number-field"
import { Rating } from "@workspace/ui/components/rating"
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@workspace/ui/components/stepper"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@workspace/ui/components/timeline"
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarSeparator,
} from "@workspace/ui/components/toolbar"
import {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemTrigger,
  TreeLeaf,
} from "@workspace/ui/components/tree"

import { ThemeToggle } from "@/components/theme-toggle"

/* -------------------------------------------------------------------------- */
/*  Page scaffolding                                                          */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-border pt-8">
      <header className="mb-5">
        <h2 className="font-heading text-xl font-normal tracking-tight">
          {title}
        </h2>
        {hint ? (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </header>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  )
}

function Demo({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <div className={className ?? "flex flex-wrap items-center gap-3"}>
        {children}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Fixtures                                                                  */
/* -------------------------------------------------------------------------- */

const FRAMEWORKS = ["Vite", "Next.js", "Remix", "Astro", "Nuxt"]

const KS_OPTIONS = { a: "Option A", b: "Option B" }

const CHART_DATA = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 264, mobile: 140 },
]

const CHART_CONFIG = {
  desktop: { label: "Desktop", color: "var(--ds-chart-1)" },
  mobile: { label: "Mobile", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

const SWATCHES = [
  { name: "noir", token: "--ds-noir" },
  { name: "rouge", token: "--ds-rouge" },
  { name: "marron", token: "--ds-marron" },
  { name: "kaki", token: "--ds-kaki" },
  { name: "beige", token: "--ds-beige" },
  { name: "jaune", token: "--ds-jaune" },
  { name: "bleu", token: "--ds-bleu" },
  { name: "vert", token: "--ds-vert" },
  { name: "gris", token: "--ds-gris" },
  { name: "grey", token: "--ds-grey" },
]

const INVOICES = [
  { id: "INV-001", status: "Paid", method: "Card", amount: "€250.00" },
  { id: "INV-002", status: "Pending", method: "Transfer", amount: "€150.00" },
  { id: "INV-003", status: "Overdue", method: "Card", amount: "€350.00" },
]

const INVOICE_COLUMNS: ColumnDef<(typeof INVOICES)[number]>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "method", header: "Method" },
  { accessorKey: "amount", header: "Amount" },
]

const MILESTONES = [
  {
    title: "Brief validated",
    time: "12 Mar 2026",
    detail: "Scope and brand charter signed off.",
    state: "completed" as const,
  },
  {
    title: "Tokens ported",
    time: "18 Mar 2026",
    detail: "Tier-1 primitives mapped onto shadcn slots.",
    state: "completed" as const,
  },
  {
    title: "Component audit",
    time: "25 Mar 2026",
    detail: "Base UI coverage reviewed across the registry.",
    state: "active" as const,
  },
  {
    title: "Handover",
    time: "—",
    detail: "Documentation and release pending.",
    state: "inactive" as const,
  },
]

/* -------------------------------------------------------------------------- */

export function Showcase() {
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined)
  const [uploads, setUploads] = React.useState<File[]>([])

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-light tracking-tight">
            Diametral × shadcn
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            72 components on Diametral brand tokens — 59 of the 60 shadcn
            registry components plus 13 additions (unwrapped Base UI primitives
            and common patterns the registry omits). Radius is{" "}
            <code className="font-mono text-xs">0</code> by charter — the flat
            parti pris.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-xs text-muted-foreground">
            or press <Kbd>d</Kbd>
          </span>
        </div>
      </header>

      <div className="flex flex-col gap-12">
        {/* ---------------------------------------------------------------- */}
        <Section
          title="Brand tokens"
          hint="Tier-1 primitives ported from tokens/tokens.json. Every shadcn slot references these."
        >
          <Demo label="Palette" className="flex flex-wrap gap-4">
            {SWATCHES.map((swatch) => (
              <div key={swatch.name} className="flex flex-col gap-1.5">
                <div
                  className="size-14 border border-border"
                  style={{ background: `var(${swatch.token})` }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {swatch.name}
                </span>
              </div>
            ))}
          </Demo>
          <Demo label="Type scale" className="flex flex-col gap-1">
            <p className="font-heading text-2xl font-light">
              Ufficio title face
            </p>
            <p className="text-base">Geist body — 14px base, 130% leading.</p>
            <p className="font-mono text-xs text-muted-foreground">
              Geist Mono for tokens and code.
            </p>
          </Demo>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Buttons & actions">
          <Demo label="Button variants">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </Demo>
          <Demo label="Palette tones">
            <Button tone="noir">Noir</Button>
            <Button tone="rouge">Rouge</Button>
            <Button tone="marron">Marron</Button>
            <Button tone="kaki">Kaki</Button>
            <Button tone="beige">Beige</Button>
            <Button tone="vert">Vert</Button>
            <Button tone="bleu">Bleu</Button>
            <Button tone="jaune">Jaune</Button>
          </Demo>
          <Demo label="Tones on outline & ghost">
            <Button variant="outline" tone="rouge">
              Outline rouge
            </Button>
            <Button variant="outline" tone="bleu">
              Outline bleu
            </Button>
            <Button variant="ghost" tone="vert">
              Ghost vert
            </Button>
            <Button variant="ghost" tone="marron">
              Ghost marron
            </Button>
          </Demo>
          <Demo label="Sizes & state">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Settings">
              <GearIcon />
            </Button>
            <Button disabled>Disabled</Button>
            <Button>
              <Spinner /> Loading
            </Button>
          </Demo>
          <Demo label="ButtonGroup">
            <ButtonGroup>
              <Button variant="outline">Copy</Button>
              <ButtonGroupSeparator />
              <Button variant="outline">Paste</Button>
              <ButtonGroupSeparator />
              <Button variant="outline" size="icon" aria-label="More">
                <DotsThreeIcon />
              </Button>
            </ButtonGroup>
          </Demo>
          <Demo label="Toggle / ToggleGroup">
            <Toggle aria-label="Bold">
              <TextBIcon />
            </Toggle>
            <ToggleGroup defaultValue={["italic"]}>
              <ToggleGroupItem value="bold" aria-label="Bold">
                <TextBIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <TextItalicIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <TextUnderlineIcon />
              </ToggleGroupItem>
            </ToggleGroup>
          </Demo>
          <Demo label="Kbd / Toast">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
            <Button
              variant="outline"
              onClick={() => toast.add({ title: "Saved" })}
            >
              Fire a toast
            </Button>
          </Demo>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Form controls">
          <Demo
            label="Field / Input / Textarea / Select"
            className="grid gap-6 sm:grid-cols-2"
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="ks-email">Email</FieldLabel>
                <Input
                  id="ks-email"
                  type="email"
                  placeholder="you@diametral.com"
                />
                <FieldDescription>We never share it.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="ks-note">Note</FieldLabel>
                <Textarea id="ks-note" placeholder="Say something…" rows={3} />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="ks-search">InputGroup</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <MagnifyingGlassIcon />
                  </InputGroupAddon>
                  <InputGroupInput id="ks-search" placeholder="Search…" />
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel>Select</FieldLabel>
                <Select defaultValue="vite">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vite">Vite</SelectItem>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Select (small)</FieldLabel>
                <Select items={KS_OPTIONS} defaultValue="b">
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(KS_OPTIONS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </Demo>

          <Demo
            label="Checkbox / Radio / Switch"
            className="grid gap-6 sm:grid-cols-3"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Checkbox id="ks-cb1" defaultChecked />
                <Label htmlFor="ks-cb1">Accept terms</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ks-cb2" />
                <Label htmlFor="ks-cb2">Subscribe</Label>
              </div>
            </div>
            <RadioGroup defaultValue="monthly" className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="monthly" id="ks-r1" />
                <Label htmlFor="ks-r1">Monthly</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yearly" id="ks-r2" />
                <Label htmlFor="ks-r2">Yearly</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Switch id="ks-sw" defaultChecked />
              <Label htmlFor="ks-sw">Notifications</Label>
            </div>
          </Demo>

          <Demo label="Slider / InputOTP" className="grid gap-6 sm:grid-cols-2">
            <Slider defaultValue={40} />
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Demo>

          <Demo label="Combobox" className="max-w-sm">
            <Combobox items={FRAMEWORKS}>
              <ComboboxInput placeholder="Pick a framework…" />
              <ComboboxContent>
                <ComboboxEmpty>No framework found.</ComboboxEmpty>
                <ComboboxList>
                  {FRAMEWORKS.map((framework) => (
                    <ComboboxItem key={framework} value={framework}>
                      {framework}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Demo>

          <Demo label="Autocomplete" className="max-w-sm">
            <Autocomplete items={FRAMEWORKS}>
              <AutocompleteInput placeholder="Type to filter…" showClear />
              <AutocompleteContent>
                <AutocompleteEmpty>No framework found.</AutocompleteEmpty>
                <AutocompleteList>
                  {(framework: string) => (
                    <AutocompleteItem key={framework} value={framework}>
                      {framework}
                    </AutocompleteItem>
                  )}
                </AutocompleteList>
              </AutocompleteContent>
            </Autocomplete>
          </Demo>

          <Demo
            label="NumberField / CheckboxGroup"
            className="grid gap-6 sm:grid-cols-2"
          >
            <Field>
              <FieldLabel>Quantity</FieldLabel>
              <NumberField defaultValue={3} min={0} max={99}>
                <NumberFieldGroup>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
              <FieldDescription>
                Hold <Kbd>shift</Kbd> to step by ten.
              </FieldDescription>
            </Field>
            <CheckboxGroup
              defaultValue={["vite"]}
              allValues={["vite", "next", "astro"]}
            >
              <div className="flex items-center gap-2">
                <Checkbox id="ks-cg-all" parent />
                <Label htmlFor="ks-cg-all">All frameworks</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ks-cg-vite" name="vite" />
                <Label htmlFor="ks-cg-vite">Vite</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ks-cg-next" name="next" />
                <Label htmlFor="ks-cg-next">Next.js</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ks-cg-astro" name="astro" />
                <Label htmlFor="ks-cg-astro">Astro</Label>
              </div>
            </CheckboxGroup>
          </Demo>

          <Demo
            label="DatePicker / Rating"
            className="grid gap-6 sm:grid-cols-2"
          >
            <Field>
              <FieldLabel>Due date</FieldLabel>
              <DatePicker>
                <DatePickerTrigger value={dueDate} />
                <DatePickerContent>
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    autoFocus
                  />
                </DatePickerContent>
              </DatePicker>
            </Field>
            <Field>
              <FieldLabel>Satisfaction</FieldLabel>
              <Rating defaultValue={3} />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Read-only:
                </span>
                <Rating value={4} readOnly />
              </div>
            </Field>
          </Demo>

          <Demo label="FileUpload" className="max-w-md flex-col items-stretch">
            <FileUpload multiple onFiles={setUploads}>
              <FileUploadIcon />
              <FileUploadTitle>Drop files</FileUploadTitle>
              <FileUploadDescription>
                or click to browse from your machine
              </FileUploadDescription>
            </FileUpload>
            {uploads.length > 0 ? (
              <p className="mt-3 text-xs text-muted-foreground">
                {uploads.length} file{uploads.length > 1 ? "s" : ""} selected:{" "}
                {uploads.map((file) => file.name).join(", ")}
              </p>
            ) : null}
          </Demo>

          <Demo label="Form" className="max-w-sm flex-col items-stretch">
            <Form onSubmit={(event) => event.preventDefault()}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="ks-form-name">Full name</FieldLabel>
                  <Input id="ks-form-name" name="name" required />
                  <FieldDescription>
                    Base UI Form consolidates validity and focuses the first
                    invalid field on submit.
                  </FieldDescription>
                </Field>
                <Button type="submit" className="w-fit">
                  Submit
                </Button>
              </FieldGroup>
            </Form>
          </Demo>

          <Demo label="Calendar">
            <Calendar mode="single" className="border border-border" />
          </Demo>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Data display">
          <Demo label="Badge / Avatar / Marker">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+3</AvatarGroupCount>
            </AvatarGroup>
            <Marker>
              <MarkerIcon>
                <CheckIcon />
              </MarkerIcon>
              <MarkerContent>Verified</MarkerContent>
            </Marker>
          </Demo>

          <Demo label="Card / Chart" className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly report</CardTitle>
                <CardDescription>
                  Traffic across both platforms.
                </CardDescription>
                <CardAction>
                  <Button variant="ghost" size="icon" aria-label="More">
                    <DotsThreeIcon />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <ChartContainer config={CHART_CONFIG} className="h-40 w-full">
                  <BarChart data={CHART_DATA}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Progress & skeleton</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <Progress value={62}>
                  <ProgressLabel>Upload</ProgressLabel>
                  <ProgressValue />
                </Progress>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Spinner />
                  <span className="text-sm text-muted-foreground">
                    Working…
                  </span>
                </div>
              </CardContent>
            </Card>
          </Demo>

          <Demo label="Item / ItemGroup" className="max-w-lg">
            <ItemGroup className="w-full">
              <Item>
                <ItemMedia>
                  <FileTextIcon className="size-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>charter.pdf</ItemTitle>
                  <ItemDescription>2.4 MB · uploaded today</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </ItemActions>
              </Item>
              <Item>
                <ItemMedia>
                  <UserIcon className="size-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Team access</ItemTitle>
                  <ItemDescription>4 members</ItemDescription>
                </ItemContent>
              </Item>
            </ItemGroup>
          </Demo>

          <Demo label="Table" className="w-full">
            <Table>
              <TableCaption>Recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICES.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-xs">
                      {invoice.id}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "Paid"
                            ? "secondary"
                            : invoice.status === "Overdue"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.method}</TableCell>
                    <TableCell className="text-right">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Demo>

          <Demo label="Alert" className="flex w-full flex-col gap-3">
            <Alert>
              <BellIcon />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                Tokens are wired to the Diametral charter.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <WarningIcon />
              <AlertTitle>Build failed</AlertTitle>
              <AlertDescription>
                Two type errors in the UI package.
              </AlertDescription>
              <AlertAction>
                <Button size="sm" variant="outline">
                  Retry
                </Button>
              </AlertAction>
            </Alert>
          </Demo>

          <Demo label="Empty" className="w-full">
            <Empty className="w-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileTextIcon />
                </EmptyMedia>
                <EmptyTitle>No documents</EmptyTitle>
                <EmptyDescription>
                  Upload a file to get started.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm">Upload</Button>
              </EmptyContent>
            </Empty>
          </Demo>

          <Demo
            label="AspectRatio / ScrollArea"
            className="grid gap-4 sm:grid-cols-2"
          >
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                16 / 9
              </div>
            </AspectRatio>
            <ScrollArea className="h-32 border border-border p-3">
              <div className="flex flex-col gap-2">
                {Array.from({ length: 12 }, (_, index) => (
                  <p key={index} className="text-sm">
                    Scrollable row {index + 1}
                  </p>
                ))}
              </div>
            </ScrollArea>
          </Demo>

          <Demo label="Meter" className="max-w-sm flex-col items-stretch">
            <Meter value={72}>
              <MeterLabel>Storage used</MeterLabel>
              <MeterValue />
            </Meter>
          </Demo>

          <Demo label="DataTable" className="w-full flex-col items-stretch">
            <DataTable
              columns={INVOICE_COLUMNS}
              data={INVOICES}
              pageSize={2}
              searchColumn="id"
              searchPlaceholder="Filter invoices"
            />
          </Demo>

          <Demo label="Timeline" className="max-w-md flex-col items-stretch">
            <Timeline>
              {MILESTONES.map((milestone) => (
                <TimelineItem
                  key={milestone.title}
                  data-state={milestone.state}
                >
                  <TimelineIndicator>
                    {milestone.state === "completed" ? <CheckIcon /> : null}
                  </TimelineIndicator>
                  <TimelineContent>
                    <TimelineTitle>{milestone.title}</TimelineTitle>
                    <TimelineTime>{milestone.time}</TimelineTime>
                    <TimelineDescription>
                      {milestone.detail}
                    </TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Demo>

          <Demo label="Stepper" className="w-full flex-col items-stretch">
            <Stepper>
              {MILESTONES.slice(0, 3).map((milestone, index) => (
                <React.Fragment key={milestone.title}>
                  {index > 0 ? <StepperSeparator /> : null}
                  <StepperItem state={milestone.state}>
                    <StepperIndicator>{index + 1}</StepperIndicator>
                    <StepperContent>
                      <StepperTitle>{milestone.title}</StepperTitle>
                    </StepperContent>
                  </StepperItem>
                </React.Fragment>
              ))}
            </Stepper>
          </Demo>

          <Demo label="Tree" className="max-w-sm flex-col items-stretch">
            <Tree className="border border-border p-2">
              <TreeItem defaultOpen>
                <TreeItemTrigger>
                  <FolderIcon />
                  packages
                </TreeItemTrigger>
                <TreeItemContent>
                  <TreeItem defaultOpen>
                    <TreeItemTrigger>
                      <FolderIcon />
                      ui
                    </TreeItemTrigger>
                    <TreeItemContent>
                      <TreeLeaf>
                        <FileIcon />
                        button.tsx
                      </TreeLeaf>
                      <TreeLeaf>
                        <FileIcon />
                        meter.tsx
                      </TreeLeaf>
                    </TreeItemContent>
                  </TreeItem>
                  <TreeLeaf>
                    <FileIcon />
                    package.json
                  </TreeLeaf>
                </TreeItemContent>
              </TreeItem>
            </Tree>
          </Demo>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Navigation & layout">
          <Demo label="Breadcrumb">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Button</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Demo>

          <Demo label="Tabs" className="w-full">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-4 text-sm">
                Overview panel content.
              </TabsContent>
              <TabsContent value="activity" className="pt-4 text-sm">
                Activity panel content.
              </TabsContent>
              <TabsContent value="settings" className="pt-4 text-sm">
                Settings panel content.
              </TabsContent>
            </Tabs>
          </Demo>

          <Demo label="NavigationMenu / Menubar">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Docs</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Tokens</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Open…</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Undo</MenubarItem>
                  <MenubarItem>Redo</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </Demo>

          <Demo label="Pagination">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Demo>

          <Demo label="Sidebar" className="w-full">
            <SidebarProvider className="min-h-56 border border-border">
              <Sidebar collapsible="none" className="w-52">
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton isActive>
                            <HouseIcon /> Dashboard
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <FileTextIcon /> Documents
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <GearIcon /> Settings
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <SidebarInset className="p-4">
                <SidebarTrigger />
                <p className="mt-3 text-sm text-muted-foreground">
                  Inset content area.
                </p>
              </SidebarInset>
            </SidebarProvider>
          </Demo>

          <Demo label="Resizable" className="w-full">
            <ResizablePanelGroup className="h-32 border border-border">
              <ResizablePanel defaultSize={40}>
                <div className="flex h-full items-center justify-center text-sm">
                  Left
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60}>
                <div className="flex h-full items-center justify-center text-sm">
                  Right
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </Demo>

          <Demo label="Carousel" className="w-full max-w-sm">
            <Carousel className="w-full">
              <CarouselContent>
                {Array.from({ length: 4 }, (_, index) => (
                  <CarouselItem key={index}>
                    <div className="flex h-28 items-center justify-center border border-border text-sm">
                      Slide {index + 1}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </Demo>

          <Demo label="Toolbar">
            <Toolbar>
              <ToolbarGroup>
                <ToolbarButton aria-label="Bold">
                  <TextBIcon />
                </ToolbarButton>
                <ToolbarButton aria-label="Italic">
                  <TextItalicIcon />
                </ToolbarButton>
                <ToolbarButton aria-label="Underline">
                  <TextUnderlineIcon />
                </ToolbarButton>
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarInput placeholder="Search…" aria-label="Search" />
            </Toolbar>
          </Demo>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Overlays & disclosure">
          <Demo label="Dialog / AlertDialog / Sheet / Drawer">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename project</DialogTitle>
                  <DialogDescription>
                    This changes the display name only.
                  </DialogDescription>
                </DialogHeader>
                <Field>
                  <FieldLabel htmlFor="ks-rename">Name</FieldLabel>
                  <Input id="ks-rename" defaultValue="design-system2" />
                </Field>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
                  <DialogClose render={<Button />}>Save</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>
                AlertDialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                Sheet
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow the result set.</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <Drawer>
              <DrawerTrigger render={<Button variant="outline" />}>
                Drawer
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Quick actions</DrawerTitle>
                  <DrawerDescription>Swipe down to dismiss.</DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </Demo>

          <Demo label="Popover / HoverCard / Tooltip">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Popover
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>Set the layout box.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <HoverCard>
              <HoverCardTrigger render={<Button variant="link" />}>
                HoverCard
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Preview on hover, no click required.</p>
              </HoverCardContent>
            </HoverCard>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Tooltip
              </TooltipTrigger>
              <TooltipContent>Keyboard shortcut: ⌘K</TooltipContent>
            </Tooltip>
          </Demo>

          <Demo label="DropdownMenu / ContextMenu">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                DropdownMenu
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ContextMenu>
              <ContextMenuTrigger
                render={
                  <div className="flex h-16 w-48 items-center justify-center border border-dashed border-border text-xs text-muted-foreground" />
                }
              >
                Right-click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Reload</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </Demo>

          <Demo label="Command" className="w-full max-w-md">
            <Command className="border border-border">
              <CommandInput placeholder="Type a command…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <MagnifyingGlassIcon /> Search docs
                    <CommandShortcut>⌘K</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <GearIcon /> Open settings
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Demo>

          <Demo
            label="Accordion / Collapsible"
            className="grid w-full gap-6 sm:grid-cols-2"
          >
            <Accordion>
              <AccordionItem value="a">
                <AccordionTrigger>Is it flat by default?</AccordionTrigger>
                <AccordionContent>
                  Yes —{" "}
                  <code className="font-mono text-xs">--ds-radius: 0px</code>.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Can I round it?</AccordionTrigger>
                <AccordionContent>
                  Override that one token; every radius derives from it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Collapsible>
              <CollapsibleTrigger render={<Button variant="outline" />}>
                Toggle details
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
                Hidden content revealed on demand.
              </CollapsibleContent>
            </Collapsible>
          </Demo>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          title="Conversation primitives"
          hint="The chat/AI surface shadcn v4 added: bubbles, messages, attachments, scroller."
        >
          <Demo label="Bubble" className="w-full max-w-md">
            <BubbleGroup className="w-full">
              <Bubble>
                <BubbleContent>How do I theme this?</BubbleContent>
              </Bubble>
              <Bubble>
                <BubbleContent>Override the --ds-* semantics.</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </Demo>

          <Demo label="Message" className="w-full max-w-md">
            <MessageGroup className="w-full">
              <Message>
                <MessageAvatar>
                  <Avatar>
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  Ported the charter tokens into the monorepo.
                </MessageContent>
              </Message>
            </MessageGroup>
          </Demo>

          <Demo label="Attachment" className="w-full max-w-md">
            <AttachmentGroup className="w-full">
              <Attachment>
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>charte-diametral.pdf</AttachmentTitle>
                  <AttachmentDescription>1.2 MB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            </AttachmentGroup>
          </Demo>

          <Demo label="MessageScroller" className="w-full max-w-md">
            <MessageScrollerProvider>
              <MessageScroller className="h-36 w-full border border-border">
                <MessageScrollerViewport>
                  <MessageScrollerContent>
                    {Array.from({ length: 8 }, (_, index) => (
                      <MessageScrollerItem
                        key={index}
                        className="px-3 py-1.5 text-sm"
                      >
                        Message {index + 1}
                      </MessageScrollerItem>
                    ))}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
              </MessageScroller>
            </MessageScrollerProvider>
          </Demo>

          <Demo label="Send row" className="w-full max-w-md">
            <InputGroup className="w-full">
              <InputGroupInput placeholder="Message…" />
              <InputGroupAddon align="inline-end">
                <Button size="icon" aria-label="Send">
                  <PaperPlaneTiltIcon />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Demo>
        </Section>
      </div>
    </div>
  )
}
