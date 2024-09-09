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

import { IProduct } from '@/server/_types/product-type';
import { useDeleteProduct } from '@/server/_actions/product-action';

interface CellActionProps {
    data: IProduct;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const doDeleteProduct = useDeleteProduct()

    const onConfirm = async () => {
        setLoading(true);
        try {
            await doDeleteProduct.mutateAsync({ id: data.id })
            router.refresh();
        } catch (error) {
            console.error('Error deleting product:', error);
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
                        onClick={() => router.push(`/admin/product/${data.id}`)}
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
