'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/shared/components/ui/data-table';
import { Heading } from '@/shared/components/ui/heading';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button';

import { ICategory } from '@/server/_types/category-type';

import { columns } from './column';

interface ProductsClientProps {
    data: ICategory[];
}

export const CategoryClient: React.FC<ProductsClientProps> = ({ data }) => {
    const router = useRouter()

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Category (${data.length})`}
                    description="Manage category (Client side table functionalities.)"
                />
                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/admin/category/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};
