"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type CellContext,
  type ColumnFiltersState,
  type ExpandedState,
  type Header,
  type OnChangeFn,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"

import { useControllableValue } from "../hooks/use-controllable-value.js"
import { cn } from "../lib/utils.js"
import { Button } from "./button.js"
import { Checkbox } from "./checkbox.js"
import { Editable } from "./editable.js"
import { Input } from "./input.js"

declare module "@tanstack/react-table" {
  // Per-column opt-in for inline editing, mirroring v1's DataGridColumn flag.
  // Only read when the table itself is `editable`, so one prop still turns the
  // whole behaviour off.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    editable?: boolean
  }
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.js"
import {
  CaretUpIcon,
  CaretDownIcon,
  CaretUpDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react"

function DataTableSortIcon({
  direction,
}: {
  direction: false | "asc" | "desc"
}) {
  if (direction === "asc") {
    return <CaretUpIcon className="size-3" />
  }

  if (direction === "desc") {
    return <CaretDownIcon className="size-3" />
  }

  return <CaretUpDownIcon className="size-3 opacity-50" />
}

function DataTableColumnHeader<TData, TValue>({
  header,
}: {
  header: Header<TData, TValue>
}) {
  const content = flexRender(
    header.column.columnDef.header,
    header.getContext()
  )

  if (!header.column.getCanSort()) {
    return content
  }

  return (
    <button
      type="button"
      data-slot="data-table-column-header"
      onClick={header.column.getToggleSortingHandler()}
      className="-mx-1 inline-flex items-center gap-1.5 rounded-none px-1 text-inherit uppercase outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
    >
      {content}
      <DataTableSortIcon direction={header.column.getIsSorted()} />
    </button>
  )
}

/**
 * The checkbox column, prepended when `selectable`. It is built here rather
 * than asked of the caller because a select-all whose state has to be right in
 * three ways — none, some, all — is exactly the thing every consumer would get
 * subtly wrong.
 */
function selectionColumn<TData, TValue>(
  label: (row: TData) => string
): ColumnDef<TData, TValue> {
  return {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        // Base UI takes `indeterminate` as its own prop rather than as a third
        // `checked` value, so the partial state is passed separately.
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(checked === true)
        }
        aria-label="Select all rows on this page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
        aria-label={label(row.original)}
      />
    ),
  }
}

/**
 * The disclosure column, prepended when `expandable`. The trigger is a real
 * button carrying `aria-expanded` and a per-row name, so the detail is
 * reachable by keyboard and announced — a caret on a `td` click handler is
 * neither.
 */
function expanderColumn<TData, TValue>(
  label: (row: TData) => string
): ColumnDef<TData, TValue> {
  return {
    id: "expander",
    enableSorting: false,
    enableHiding: false,
    header: () => <span className="sr-only">Detail</span>,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-expanded={row.getIsExpanded()}
          aria-label={label(row.original)}
          onClick={row.getToggleExpandedHandler()}
        >
          <CaretRightIcon
            className={cn(
              "transition-[rotate] duration-200",
              row.getIsExpanded() && "rotate-90"
            )}
          />
        </Button>
      ) : null,
  }
}

function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  searchColumn,
  searchPlaceholder = "Filter results",
  emptyMessage = "No results.",
  className,
  selectable = false,
  rowKey,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  rowLabel,
  expandable = false,
  renderDetail,
  detailLabel,
  editable = false,
  onCellEdit,
  sort,
  defaultSort,
  onSortChange,
}: {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize?: number
  searchColumn?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  /** Prepend a checkbox column. */
  selectable?: boolean
  /** Stable identity per row. Without it, keys are row indices. */
  rowKey?: (row: TData) => string
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  /** Accessible name for a row's checkbox. Defaults to `Select row <key>`. */
  rowLabel?: (row: TData) => string
  /** Prepend a disclosure column. A function decides per row. */
  expandable?: boolean | ((row: TData) => boolean)
  /** The detail node, rendered in a full-width row under its parent. */
  renderDetail?: (row: TData) => React.ReactNode
  /** Accessible name for a row's disclosure. Defaults to `Show detail`. */
  detailLabel?: (row: TData) => string
  /** Turn on inline editing for columns whose `meta.editable` is set. */
  editable?: boolean
  onCellEdit?: (row: TData, columnKey: string, value: string) => void
  sort?: SortingState
  defaultSort?: SortingState
  onSortChange?: (sort: SortingState) => void
}) {
  const [sorting, setSortingState] = useControllableValue<SortingState>({
    value: sort,
    defaultValue: defaultSort ?? [],
    onChange: onSortChange,
  })

  const setSorting: OnChangeFn<SortingState> = (updater) => {
    setSortingState(typeof updater === "function" ? updater(sorting) : updater)
  }
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const [keys, setKeys] = useControllableValue<string[]>({
    value: selectedKeys,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  })

  // TanStack holds selection as a truthy map; the prop is a key list, which is
  // what a caller actually wants to store and compare.
  const rowSelection = React.useMemo<RowSelectionState>(
    () => Object.fromEntries(keys.map((key) => [key, true])),
    [keys]
  )

  const onRowSelectionChange: OnChangeFn<RowSelectionState> = (updater) => {
    const next = typeof updater === "function" ? updater(rowSelection) : updater
    setKeys(Object.keys(next).filter((key) => next[key]))
  }

  // `rowKey` and `rowLabel` are usually written inline at the call site, so a
  // new identity arrives on every render. Reading them through a ref keeps the
  // column list and `getRowId` stable — rebuilding either on each render makes
  // TanStack re-create its column instances, and the select-all header then
  // renders against a stale table and jams.
  const rowKeyRef = React.useRef(rowKey)
  const rowLabelRef = React.useRef(rowLabel)
  const detailLabelRef = React.useRef(detailLabel)
  const expandableRef = React.useRef(expandable)
  rowKeyRef.current = rowKey
  rowLabelRef.current = rowLabel
  detailLabelRef.current = detailLabel
  expandableRef.current = expandable

  const onCellEditRef = React.useRef(onCellEdit)
  onCellEditRef.current = onCellEdit

  const canExpand = Boolean(expandable) && Boolean(renderDetail)

  // An editable column keeps its accessor — so sorting and filtering still read
  // the value — and only its `cell` is swapped for the existing `Editable`,
  // rather than a second inline-edit implementation living here. Editable's own
  // pencil is a focusable button, which is the keyboard path v1's double-click
  // never had.
  const editableColumns = React.useMemo(
    () =>
      editable
        ? columns.map((column) =>
            column.meta?.editable
              ? {
                  ...column,
                  cell: (context: CellContext<TData, unknown>) => (
                    <Editable
                      value={String(context.getValue() ?? "")}
                      onSubmit={(next) =>
                        onCellEditRef.current?.(
                          context.row.original,
                          context.column.id,
                          next
                        )
                      }
                    />
                  ),
                }
              : column
          )
        : columns,
    [editable, columns]
  )

  const resolvedColumns = React.useMemo(
    () => [
      ...(canExpand
        ? [
            expanderColumn<TData, TValue>(
              (row) => detailLabelRef.current?.(row) ?? "Show detail"
            ),
          ]
        : []),
      ...(selectable
        ? [
            selectionColumn<TData, TValue>(
              (row) =>
                rowLabelRef.current?.(row) ??
                `Select row ${rowKeyRef.current ? rowKeyRef.current(row) : ""}`
            ),
          ]
        : []),
      ...editableColumns,
    ],
    [selectable, canExpand, editableColumns]
  )

  const getRowId = React.useMemo(
    () => (rowKey ? (row: TData) => rowKeyRef.current!(row) : undefined),
    // Only whether a key function exists matters; its identity is behind a ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Boolean(rowKey)]
  )

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    state: { sorting, columnFilters, rowSelection, expanded },
    getRowId,
    enableRowSelection: selectable,
    onRowSelectionChange,
    onExpandedChange: setExpanded,
    // Expansion here is a detail panel, not a row tree, so "can expand" is the
    // caller's predicate rather than a child-row count.
    getRowCanExpand: canExpand
      ? (row) => {
          const rule = expandableRef.current
          return typeof rule === "function" ? rule(row.original) : true
        }
      : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: canExpand ? getExpandedRowModel() : undefined,
    getPaginationRowModel: pageSize ? getPaginationRowModel() : undefined,
    initialState: pageSize ? { pagination: { pageSize } } : undefined,
  })

  const filterColumn = searchColumn ? table.getColumn(searchColumn) : undefined

  return (
    <div
      data-slot="data-table"
      className={cn("flex w-full flex-col gap-4", className)}
    >
      {filterColumn && (
        <Input
          data-slot="data-table-search"
          value={(filterColumn.getFilterValue() as string) ?? ""}
          onChange={(event) => filterColumn.setFilterValue(event.target.value)}
          placeholder={searchPlaceholder}
          className="max-w-64"
        />
      )}

      <div className="border-t border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <DataTableColumnHeader header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {canExpand && row.getIsExpanded() ? (
                    <TableRow data-slot="data-table-detail">
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="bg-muted/40 p-4"
                      >
                        {renderDetail?.(row.original)}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={resolvedColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageSize && (
        <div
          data-slot="data-table-pagination"
          className="flex items-center justify-between gap-4"
        >
          <span className="text-xs tracking-wide text-muted-foreground tabular-nums">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              <CaretLeftIcon className="rtl:rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              <CaretRightIcon className="rtl:rotate-180" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataTable, DataTableColumnHeader }
export type { ColumnDef }
