import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { IUser } from "@/server/_types/user-type";

import { CellAction } from "./cell-action";
import { Button } from "../../ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    header: "ID",
  },
  {
    accessorKey: "emailAddresses",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "emailAddresses",
    header: "Email",
    cell: ({ getValue }) => {
      const emailAddresses = getValue() as { emailAddress: string }[];
      return;
      emailAddresses.map((email) => email.emailAddress).join(", ");
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "emailAddresses",
    header: "Role",
    cell: ({ getValue }) => {
      const emailAddresses = getValue() as { emailAddress: string }[];
      if (
        emailAddresses[0].emailAddress === "nguyentrunghieuthptxp@gmail.com"
      ) {
        return "ADMIN";
      } else {
        return "CUSTOMER";
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
