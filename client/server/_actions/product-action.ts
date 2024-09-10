import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/shared/components/ui/use-toast";
import { queryClient } from "@/shared/lib/query-config";
import { axiosInstance } from "../http-client";

import { IProduct } from "../_types/product-type";

import { IBaseResponse } from "../_types/base";

import PRODUCT_PATHS from "../_paths/product-path";


export const useGetProduct = () => {
    const queryFn = async (): Promise<IProduct[]> => {
        const response = await axiosInstance.get<IBaseResponse<IProduct[]>>(PRODUCT_PATHS.GET_ALL);
        return response.data;
    };

    return useQuery<IProduct[], Error>({
        queryKey: ['PRODUCT', 'GET_ALL'],
        queryFn: queryFn,
    });
};

export const useGetProductyId = (id: number | undefined) => {
    const queryFn = async (): Promise<IProduct> => {
        const response = await axiosInstance.get<IBaseResponse<IProduct>>(`${PRODUCT_PATHS.GET_BY_ID}/${id}`);
        return response.data;
    };

    return useQuery<IProduct, Error>({
        queryKey: ['PRODUCT', 'GET_BY_ID', id],
        queryFn: queryFn,
        enabled: !!id,
    });
};

export const useGetProductBySearch = (query: string) => {
    const queryFn = async (): Promise<IProduct[]> => {
        const response = await axiosInstance.get<IBaseResponse<IProduct[]>>(`${PRODUCT_PATHS.SEARCH}${query}`);
        return response.data;
    };

    return useQuery<IProduct[], Error>({
        queryKey: ['PRODUCT', 'SEARCH', query],
        queryFn: queryFn,
        enabled: query.length > 0,
    });
};

export const useCreateProduct: () => UseMutationResult<
    IBaseResponse<any[]>,
    Error,
    { categoryId: string; name: string; description: string; price: number; imageUrl: string }
> = () => {

    return useMutation<IBaseResponse<any[]>, Error, { categoryId: string; name: string; description: string; price: number; imageUrl: string }>({
        mutationFn: (body: { categoryId: string; name: string; description: string; price: number; imageUrl: string }) =>
            axiosInstance.post<IBaseResponse<any>>(PRODUCT_PATHS.CREATE, body),
        onMutate: () => {
            toast({
                variant: "destructive",
                title: 'Đang xử lý'
            });
        },
        onSuccess: async (data) => {
            if (!data.data) {
                toast({
                    variant: "destructive",
                    title: 'Tạo không thành công'
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ["CREATE", "PRODUCT"] });
                toast({
                    variant: "default",
                    title: 'Tạo sản phẩm thành công'
                });
            }
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useUpdateProduct: () => UseMutationResult<
    IBaseResponse<any>,
    Error,
    { id: number; categoryId: string; name: string; description: string; price: number; imageUrl: string }
> = () => {
    const router = useRouter()

    return useMutation<IBaseResponse<any[]>, Error, { id: number; categoryId: string; name: string; description: string; price: number; imageUrl: string }>({
        mutationFn: (body: { id: number; categoryId: string; name: string; description: string; price: number; imageUrl: string }) =>
            axiosInstance.patch<IBaseResponse<any>>(`${PRODUCT_PATHS.UPDATE}/${body.id}`, body),
        onMutate: () => {
            toast({
                variant: "destructive",
                title: 'Đang xử lý'
            });
        },
        onSuccess: async (data) => {
            if (!data.data) {
                toast({
                    variant: "destructive",
                    title: 'Cập nhật không thành công'
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ['PRODUCT', 'GET_ALL'] });
                toast({
                    variant: "default",
                    title: 'Cập nhật sản phẩm thành công'
                });
                router.push("/admin/product")
            }
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useDeleteProduct: () => UseMutationResult<
    IBaseResponse<any>,
    Error,
    { id: number }
> = () => {

    return useMutation<IBaseResponse<any>, Error, { id: number }>({
        mutationFn: (body: { id: number }) =>
            axiosInstance.delete<IBaseResponse<any>>(`${PRODUCT_PATHS.DELETE}/${body.id}`),
        onMutate: () => {
            toast({
                variant: "destructive",
                title: 'Đang xử lý'
            });
        },
        onSuccess: async (data) => {
            if (!data.data) {
                toast({
                    variant: "destructive",
                    title: 'Xóa không thành công'
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ['PRODUCT', 'GET_ALL'] });
                toast({
                    variant: "default",
                    title: 'Xóa thành công'
                });
            }
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};
