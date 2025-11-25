"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export type Code = {
    id: string
    code: string
    targetUrl: string
    clickCount: number
    createdAtFormatted: string
    lstClickedAtFormatted: string | null
}

export const columns: ColumnDef<Code>[] = [
     {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                </button>
            )
        },
        cell: ({ getValue }) => (getValue() as string),
    },
    {
        accessorKey: "code",
        header: "Code",
        cell: ({ getValue }) => (
            <code className="font-mono text-sm">{getValue() as string}</code>
        ),
    },
    {
        accessorKey: "targetUrl",
        header: "Target URL",
    },
    {
        accessorKey: "clickCount",
        header: "Clicks",
    },
    {
        accessorKey: "createdAtFormatted",
        header: "Created At",
        cell: ({ getValue }) => (getValue() as string),
    },
    {
        accessorKey: "lstClickedAtFormatted",
        header: "Last Clicked",
        cell: ({ getValue }) => {
            const v = getValue() as string | null
            return v ? v : "Never"
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: () => {

        },
    },
]