import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/shared/components/ui/use-toast";
import { queryClient } from "@/shared/lib/query-config";
import { axiosInstance } from "../http-client";

import { IOrder } from "../_types/order-type";

import { IBaseResponse } from "../_types/base";

import ORDER_PATHS from "../_paths/order-path";


export const useGetOrder = () => {
    const queryFn = async (): Promise<IOrder[]> => {
        const response = await axiosInstance.get<IBaseResponse<any[]>>(ORDER_PATHS.GET_ALL);
        return response.data;
    };

    return useQuery<IOrder[], Error>({
        queryKey: ['ORDER', 'GET_ALL'],
        queryFn: queryFn,
    });
};


export const useCreateOrder: () => UseMutationResult<
    IBaseResponse<any>,
    Error,
    {
        fullName: string;
        address: string;
        city: string;
        country: string;
        postCode: string;
        paymentMethod: string;
        status: string;
        products: { productId: number; quantity: number }[];
    }
> = () => {
    const router = useRouter();

    return useMutation<IBaseResponse<any>, Error, {
        fullName: string;
        address: string;
        city: string;
        country: string;
        postCode: string;
        paymentMethod: string;
        status: string;
        products: { productId: number; quantity: number }[];
    }>({
        mutationFn: (body) =>
            axiosInstance.post<IBaseResponse<any>>(`/api/order`, body),
        onMutate: () => {
            toast({
                variant: 'destructive',
                title: 'Đang xử lý',
            });
        },
        onSuccess: async (data) => {
            if (!data.data) {
                toast({
                    variant: 'destructive',
                    title: 'Tạo đơn hàng không thành công',
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ['ORDER', 'GET_ALL'] });
                queryClient.invalidateQueries({ queryKey: ['ORDER_PRODUCT', 'GET_ALL'] });

                toast({
                    variant: 'default',
                    title: 'Tạo đơn hàng thành công',
                });
                router.push('/');
            }
        },
        onError(error) {
            console.log(error);
        },
    });
};

export const useUpdateOrder: () => UseMutationResult<
    IBaseResponse<any>,
    Error,
    {
        id: number;
        fullName: string;
        address: string;
        city: string;
        country: string;
        postCode: string;
        paymentMethod: string;
        status: string;
        products: { productId: number; quantity: number }[];
    }
> = () => {
    const router = useRouter();

    return useMutation<IBaseResponse<any>, Error, {
        id: number;
        fullName: string;
        address: string;
        city: string;
        country: string;
        postCode: string;
        paymentMethod: string;
        status: string;
        products: { productId: number; quantity: number }[];
    }>({
        mutationFn: (body) =>
            axiosInstance.patch<IBaseResponse<any>>(`/api/order/${body.id}`, body),
        onMutate: () => {
            toast({
                variant: 'destructive',
                title: 'Đang xử lý',
            });
        },
        onSuccess: async (data) => {
            if (!data.data) {
                toast({
                    variant: 'destructive',
                    title: 'Cập nhật không thành công',
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ['ORDER', 'GET_ALL'] });
                queryClient.invalidateQueries({ queryKey: ['ORDER_PRODUCT', 'GET_ALL'] });

                toast({
                    variant: 'default',
                    title: 'Cập nhật đơn hàng thành công',
                });
                router.push('/admin/order');
            }
        },
        onError(error) {
            console.log(error);
        },
    });
};
