'use client'

import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs';
import { useGetUser } from '@/server/_actions/user-action';
import { UserClient } from '@/shared/components/table/user-tables/client';
import PageContainer from '@/shared/components/page-container';
import SkeletonTable from '@/shared/components/table/skeleton-table';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'User', link: '/admin/user' }
];

const Page = () => {
    const { data: users, isLoading } = useGetUser()

    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                {isLoading ? (
                    <SkeletonTable />
                ) : users && (
                    <UserClient data={users} />
                )}
            </div>
        </PageContainer>
    );
}
export default Page;
