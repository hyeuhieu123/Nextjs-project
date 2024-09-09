'use client'

import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs';
import { ProductClient } from '@/shared/components/table/product-tables/client';

import { useGetProduct } from '@/server/_actions/product-action';

import PageContainer from '@/shared/components/page-container';
import SkeletonTable from '@/shared/components/table/skeleton-table';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'Product', link: '/admin/product' }
];

const Page = () => {
    const { data: products, isLoading } = useGetProduct()

    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                {isLoading ? (
                    <SkeletonTable />
                ) : products && (
                    <ProductClient data={products} />
                )}
            </div>
        </PageContainer>
    );
}
export default Page;
