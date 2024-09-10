import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { IUser } from "@/server/_types/user-type";

import { CellAction } from "./cell-action";
import { Button } from "../../ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<IUser>[] = [
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
    accessorFn: (row) => row.emailAddresses[0]?.emailAddress || "", // Sorting by the first email address
    cell: ({ getValue }) => {
      const emailAddresses = getValue() as { emailAddress: string }[];
      return emailAddresses.map((email) => email.emailAddress).join(", ");
    },
    enableSorting: true, // Enable sorting
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
