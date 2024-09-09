'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { AlertModal } from '@/shared/components/ui/alert-modal';
import { Button } from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';

import { ICategory } from '@/server/_types/category-type';
import { useDeleteCategory } from '@/server/_actions/category-action';

interface CellActionProps {
    data: ICategory;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const doDeleteCategory = useDeleteCategory()

    const onConfirm = async () => {
        setLoading(true);
        try {
            await doDeleteCategory.mutateAsync({ id: data.id })
            router.refresh();
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        onClick={() => router.push(`/admin/category/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
