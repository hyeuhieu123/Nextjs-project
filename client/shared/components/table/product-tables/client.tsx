'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/shared/components/ui/data-table';
import { Heading } from '@/shared/components/ui/heading';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button';

import { IProduct } from '@/server/_types/product-type';

import { columns } from './column';

interface ProductsClientProps {
    data: IProduct[];
}

export const ProductClient: React.FC<ProductsClientProps> = ({ data }) => {
    const router = useRouter()

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Product (${data.length})`}
                    description="Manage product (Client side table functionalities.)"
                />
                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/admin/product/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};
