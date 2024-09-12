'use client';
import { DataTable } from '@/shared/components/ui/data-table';
import { Heading } from '@/shared/components/ui/heading';
import { Separator } from '@/shared/components/ui/separator'
    ;
import { IOrder } from '@/server/_types/order-type';

import { columns } from './column';

interface ProductsClientProps {
    data: IOrder[];
}

export const OrderClient: React.FC<ProductsClientProps> = ({ data }) => {

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Order (${data.length})`}
                    description="Manage order (Client side table functionalities.)"
                />
            </div>
            <Separator />
            <DataTable searchKey="fullName" columns={columns} data={data} />
        </>
    );
};
