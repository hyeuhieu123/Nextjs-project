'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { CategoryForm } from '@/shared/components/form/category-form';
import { useGetCategoryById } from '@/server/_actions/category-action';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin/category' },
    { title: 'Category', link: '/admin/category' },
    { title: 'Create', link: '/admin/category/create' }
];

export default function Page() {
    const pathname = usePathname();
    const categoryId = pathname.split('/').pop();

    const [initialData, setInitialData] = useState<any>(null);

    const { data: category, isLoading, error } = useGetCategoryById(Number(categoryId));

    useEffect(() => {
        if (category) {
            setInitialData(category);
        }
    }, [category]);

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <CategoryForm
                    initialData={initialData}
                    key={null}
                />
            </div>
        </ScrollArea>
    );
}
