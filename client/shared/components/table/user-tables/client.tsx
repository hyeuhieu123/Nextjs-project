'use client';

import { DataTable } from '@/shared/components/ui/data-table';
import { Heading } from '@/shared/components/ui/heading';
import { Separator } from '@/shared/components/ui/separator';

import { IUser } from '@/server/_types/user-type';

import { columns } from './column';

interface ProductsClientProps {
    data: IUser[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Users (${data.length})`}
                    description="Manage users (Client side table functionalities.)"
                />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};
