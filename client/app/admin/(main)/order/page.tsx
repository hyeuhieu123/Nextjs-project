'use client'

import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs';
import { ProductClient } from '@/shared/components/table/product-tables/client';

import { useGetOrder } from '@/server/_actions/order-action';

import PageContainer from '@/shared/components/page-container';
import SkeletonTable from '@/shared/components/table/skeleton-table';
import { OrderClient } from '@/shared/components/table/order-tables/client';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'Order', link: '/admin/order' }
];

const Page = () => {
    const { data: orders, isLoading } = useGetOrder()

    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                {isLoading ? (
                    <SkeletonTable />
                ) : orders && (
                    <OrderClient data={orders} />
                )}
            </div>
        </PageContainer>
    );
}
export default Page;
