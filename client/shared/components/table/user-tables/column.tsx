import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { IUser } from '@/server/_types/user';

import { CellAction } from './cell-action';

export const columns: ColumnDef<IUser>[] = [
    {
        id: 'select',
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
        enableHiding: false
    },
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'emailAddresses',
        header: 'Email',
        cell: ({ getValue }) => {
            const emailAddresses = getValue() as { emailAddress: string }[];
            return emailAddresses.map((email) => email.emailAddress).join(', ');
        }
    },
    {
        accessorKey: 'firstName',
        header: 'First Name',
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
    },
    {
        accessorKey: 'lastActiveAt',
        header: 'Last Active',
        cell: ({ getValue }) => {
            const date = new Date(getValue() as number);
            return date.toLocaleDateString();
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
];
