import { DataTable, type ColumnDef } from "@diametral/ui/components/data-table"

type Run = { id: string; suite: string; status: string }

const RUNS: Run[] = [
  { id: "4821", suite: "tokens", status: "passed" },
  { id: "4822", suite: "components", status: "passed" },
  { id: "4823", suite: "a11y", status: "failed" },
  { id: "4824", suite: "visual", status: "passed" },
  { id: "4825", suite: "perf", status: "passed" },
]

const COLUMNS: ColumnDef<Run>[] = [
  { accessorKey: "id", header: "Run" },
  { accessorKey: "suite", header: "Suite" },
  { accessorKey: "status", header: "Status" },
]

// `pageSize` is numeric, and `searchColumn` is what turns the filter box on —
// naming a column that does not exist silently disables it.
export default function DataTablePlayground({
  pageSize,
  ...rest
}: {
  pageSize?: string
  searchColumn?: string
  searchPlaceholder?: string
  emptyMessage?: string
}) {
  const props = {
    ...rest,
    ...(pageSize ? { pageSize: Number(pageSize) } : {}),
  }

  return (
    <div className="w-full">
      <DataTable columns={COLUMNS} data={RUNS} {...props} />
    </div>
  )
}
