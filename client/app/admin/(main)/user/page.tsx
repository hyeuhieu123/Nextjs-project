'use client'

import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs';
import { useGetUser } from '@/server/_actions/user-action';
import { UserClient } from '@/shared/components/table/user-tables/client';
import PageContainer from '@/shared/components/page-container';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'User', link: '/dashboard/user' }
];

const Page = () => {
    const { data: users, isLoading } = useGetUser()

    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                {users && <UserClient data={users} />}
            </div>
        </PageContainer>
    );
}
export default Page;
