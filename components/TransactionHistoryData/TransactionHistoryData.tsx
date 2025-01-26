import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionDetails } from "@/app/transaction/Transaction.types";
import { ColumnDef } from "@tanstack/table-core";

const columns: ColumnDef<TransactionDetails>[] = [
  { accessorKey: "type", header: "Type" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "sourceAccountNumber", header: "Source Account" },
];

export const TransactionHistoryData = ({
  data,
}: {
  data: TransactionDetails[];
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border w-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {table.getHeaderGroups().map((headerGroup) => headerGroup.headers.map((header) => (
                    <TableHead
                        key={header.id}
                    >
                      {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                          )}
                    </TableHead>
                )
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
