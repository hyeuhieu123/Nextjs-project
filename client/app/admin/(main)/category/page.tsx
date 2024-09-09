'use client'

import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs';
import { CategoryClient } from '@/shared/components/table/category-tables/client';
import { useGetCategory } from '@/server/_actions/category-action';
import PageContainer from '@/shared/components/page-container';
import SkeletonTable from '@/shared/components/table/skeleton-table';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'Category', link: '/admin/category' }
];

const Page = () => {
    const { data: categories, isLoading } = useGetCategory()

    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                {isLoading ? (
                    <SkeletonTable />
                ) : categories && (
                    <CategoryClient data={categories} />
                )}
            </div>
        </PageContainer>
    );
}
export default Page;
