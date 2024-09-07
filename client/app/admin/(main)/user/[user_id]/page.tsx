'use client'
import React from 'react';

import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs';

import PageContainer from '@/shared/components/page-container';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'User', link: '/dashboard/user' },
    { title: 'Create', link: '/dashboard/user/create' }
];
export default function Page() {
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                {/* <ProductForm
                    categories={[
                        { _id: 'shirts', name: 'shirts' },
                        { _id: 'pants', name: 'pants' }
                    ]}
                    initialData={null}
                    key={null}
                /> */}
            </div>
        </PageContainer>
    );
}
