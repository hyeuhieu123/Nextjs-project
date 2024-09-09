'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs';
import { ScrollArea } from '@/shared/components/ui/scroll-area';

import { useGetCategory, useGetCategoryById } from '@/server/_actions/category-action';
import { ProductForm } from '@/shared/components/form/product-form';
import { useGetProductyId } from '@/server/_actions/product-action';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin/product' },
    { title: 'Product', link: '/admin/product' },
    { title: 'Create', link: '/admin/product/create' }
];

export default function Page() {
    const pathname = usePathname();
    const productId = pathname.split('/').pop();

    const [initialData, setInitialData] = useState<any>(null);

    const { data: categories } = useGetCategory()

    const { data: product, isLoading, error } = useGetProductyId(Number(productId));

    useEffect(() => {
        if (product) {
            setInitialData(product);
        }
    }, [product]);

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <ProductForm
                    categories={categories && categories}
                    initialData={initialData}
                    key={null}
                />
            </div>
        </ScrollArea>
    );
}
