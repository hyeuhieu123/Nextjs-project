import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/shared/components/ui/use-toast";
import { queryClient } from "@/shared/lib/query-config";
import { axiosInstance } from "../http-client";

import { ICategory } from "../_types/category-type";

import { IBaseResponse } from "../_types/base";

import CATEGORY_PATHS from "../_paths/category-path";


export const useGetCategory = () => {
    const queryFn = async (): Promise<ICategory[]> => {
        const response = await axiosInstance.get<IBaseResponse<ICategory[]>>(CATEGORY_PATHS.GET_ALL);
        return response.data;
    };

    return useQuery<ICategory[], Error>({
        queryKey: ['CATEGORY', 'GET_ALL'],
        queryFn: queryFn,
    });
};

export const useGetCategoryById = (id: number | undefined) => {
    const queryFn = async (): Promise<ICategory> => {
        const response = await axiosInstance.get<IBaseResponse<ICategory>>(`${CATEGORY_PATHS.GET_BY_ID}/${id}`);
        return response.data;
    };

    return useQuery<ICategory, Error>({
        queryKey: ['CATEGORY', 'GET_BY_ID', id],
        queryFn: queryFn,
        enabled: !!id,
    });
};

export const useCreateCategory: () => UseMutationResult<
    IBaseResponse<any[]>,
    Error,
    { name: string, description: string }
> = () => {

    return useMutation<IBaseResponse<any[]>, Error, { name: string, description: string }>({
        mutationFn: (body: { name: string, description: string }) =>
            axiosInstance.post<IBaseResponse<any>>(CATEGORY_PATHS.CREATE, body),
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
                queryClient.invalidateQueries({ queryKey: ["CREATE", "CATEGORY"] });
                toast({
                    variant: "default",
                    title: 'Tạo thành công'
                });
            }
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useUpdateCategory: () => UseMutationResult<
    IBaseResponse<any>,
    Error,
    { id: number; name: string; description: string }
> = () => {
    const router = useRouter()

    return useMutation<IBaseResponse<any>, Error, { id: number; name: string; description: string }>({
        mutationFn: (body: { id: number; name: string; description: string }) =>
            axiosInstance.patch<IBaseResponse<any>>(`${CATEGORY_PATHS.UPDATE}/${body.id}`, body),
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
                queryClient.invalidateQueries({ queryKey: ['CATEGORY', 'GET_ALL']});
                toast({
                    variant: "default",
                    title: 'Cập nhật thành công'
                });
                router.push("/admin/category")
            }
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useDeleteCategory: () => UseMutationResult<
    IBaseResponse<any>,
    Error,
    { id: number }
> = () => {

    return useMutation<IBaseResponse<any>, Error, { id: number }>({
        mutationFn: (body: { id: number }) =>
            axiosInstance.delete<IBaseResponse<any>>(`${CATEGORY_PATHS.DELETE}/${body.id}`),
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
                queryClient.invalidateQueries({ queryKey: ['CATEGORY', 'GET_ALL'] });
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
