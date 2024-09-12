'use client';

import { useState } from 'react';
import { Check, MoreHorizontal } from 'lucide-react';

import { AlertModal } from '@/shared/components/ui/alert-modal';
import { Button } from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';

import { IOrder } from '@/server/_types/order-type';
import { useUpdateOrder } from '@/server/_actions/order-action';

interface CellActionProps {
    data: IOrder;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const doUpdateOrder = useUpdateOrder()

    const onConfirm = async () => {
        setLoading(true);
        try {
            const body = {
                ...data,
                status: "success",
            }
            await doUpdateOrder.mutateAsync(body)
            setOpen(false);
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {data.status !== "success" && (
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
                            <DropdownMenuItem onClick={() => setOpen(true)}>
                                <Check className="mr-2 h-4 w-4" /> Mark as Paid
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}
        </>
    );
};
