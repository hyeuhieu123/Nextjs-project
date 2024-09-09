import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../http-client";

import { IBaseUser, IUser } from "../_types/user-type";

import USER_PATHS from "../_paths/user-path";


export const useGetUser = () => {
    const queryFn = async (): Promise<IUser[]> => {
        const response = await axiosInstance.get<IBaseUser>(USER_PATHS.GET_ALL);
        return response.data;
    };

    return useQuery<IUser[], Error>({
        queryKey: ['USER', 'GET_ALL'],
        queryFn: queryFn,
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string) => {
            await axiosInstance.delete<any>(`${USER_PATHS.DELETE_USER}/${userId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: (error: Error) => {
            console.error('Failed to delete user:', error);
        },
    });
};
