import { cn } from "@/shared/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { IOrder } from "@/server/_types/order-type";

import { CellAction } from "./cell-action";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    id: "address",
    header: "Address",
    cell: ({ row }) => {
      const { address, city, postCode } = row.original;
      return `${address}, ${city}, ${postCode}`;
    },
  },
  {
    id: "products",
    header: "Products",
    cell: ({ row }) => {
      const products = row.original.products;
      return products
        .map(
          (product) =>
            `Product ID: ${product.productId} (Quantity: ${product.quantity})`
        )
        .join(", ");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const name = getValue() as string;
      return (
        <Badge
          className={cn(
            "uppercase",
            name === "success" ? "bg-green-400" : "bg-yellow-400"
          )}
        >
          {name}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
