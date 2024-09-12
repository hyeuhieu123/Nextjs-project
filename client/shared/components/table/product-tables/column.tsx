import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";

import { ICategory } from "@/server/_types/category-type";

import { CellAction } from "./cell-action";
import { formatCurrencyVN } from "@/shared/utils/format-money";

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ getValue }) => {
      const categoryName = getValue() as string;
      return <Badge className="text-center">{categoryName}</Badge>;
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ getValue }) => {
      const imageUrl = getValue() as string;
      return (
        <Image
          src={imageUrl}
          alt="Product Image"
          width={100}
          height={100}
          className="w-[100px] h-auto object-cover"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => {
      return <p>{formatCurrencyVN(Number(getValue()))}</p>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
