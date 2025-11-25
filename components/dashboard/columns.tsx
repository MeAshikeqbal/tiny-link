"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChartColumn, Copy, MoreHorizontal, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Link from "next/link"

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
        enableHiding: false,
        cell: ({ row }) => {
            const code = row.original.code
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(`${baseUrl}/${code}`)}
                        >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy short link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/code/${code}`} className="flex items-center w-full">
                                <ChartColumn className="mr-2 h-4 w-4" />
                                View Analytics
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Link
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]