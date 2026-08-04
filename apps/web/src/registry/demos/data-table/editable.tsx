import { useState } from "react"

import { DataTable, type ColumnDef } from "@diametral/ui/components/data-table"

type Contact = {
  id: string
  name: string
  role: string
  email: string
}

const INITIAL: Contact[] = [
  {
    id: "c-1",
    name: "Augustin Morval",
    role: "Design engineering",
    email: "amorval@diametral.com",
  },
  {
    id: "c-2",
    name: "Camille Roy",
    role: "Product design",
    email: "croy@diametral.com",
  },
  {
    id: "c-3",
    name: "Nadia Lefevre",
    role: "Frontend",
    email: "nlefevre@diametral.com",
  },
]

const COLUMNS: ColumnDef<Contact>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role", meta: { editable: true } },
  { accessorKey: "email", header: "Email", meta: { editable: true } },
]

export default function DataTableEditable() {
  const [rows, setRows] = useState(INITIAL)
  const [lastEdit, setLastEdit] = useState<string>()

  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable
        columns={COLUMNS}
        data={rows}
        rowKey={(row) => row.id}
        editable
        onCellEdit={(row, columnKey, value) => {
          setRows((current) =>
            current.map((entry) =>
              entry.id === row.id ? { ...entry, [columnKey]: value } : entry
            )
          )
          setLastEdit(`${row.name} · ${columnKey} → ${value}`)
        }}
      />
      <p className="text-sm text-muted-foreground">
        {lastEdit ?? "Role and Email are editable; Name is not."}
      </p>
    </div>
  )
}
