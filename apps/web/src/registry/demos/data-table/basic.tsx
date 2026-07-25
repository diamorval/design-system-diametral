import { DataTable, type ColumnDef } from "@diametral/ui/components/data-table"

type Run = { id: string; suite: string; duration: string; status: string }

const RUNS: Run[] = [
  { id: "4821", suite: "tokens", duration: "1.2s", status: "passed" },
  { id: "4822", suite: "components", duration: "8.4s", status: "passed" },
  { id: "4823", suite: "a11y", duration: "3.1s", status: "failed" },
  { id: "4824", suite: "visual", duration: "12.7s", status: "passed" },
]

const COLUMNS: ColumnDef<Run>[] = [
  { accessorKey: "id", header: "Run" },
  { accessorKey: "suite", header: "Suite" },
  { accessorKey: "duration", header: "Duration" },
  { accessorKey: "status", header: "Status" },
]

export default function DataTableBasic() {
  return <DataTable columns={COLUMNS} data={RUNS} />
}
