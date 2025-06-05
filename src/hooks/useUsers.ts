
import { apiClient } from "@/utils/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
	id: string;
	name: string;
	email: string;
	phone?: string;
	status: string;
	createdAt: string;
}

interface UsersResponse {
	users: User[];
	total: number;
	page: number;
	limit: number;
}

interface UseUsersParams {
	page?: number;
	limit?: number;
	search?: string;
	status?: string;
}

export const useUsers = (params: UseUsersParams = {}) => {
	const { page = 1, limit = 10, search = "", status = "" } = params;

	const queryParams = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
		...(search && { search }),
		...(status && { status }),
	});

	return useQuery({
		queryKey: ["users", page, limit, search, status],
		queryFn: () => apiClient.get<UsersResponse>(`/accounts/api/v1/users?${queryParams}`),
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: Omit<User, "id" | "createdAt">) =>
			apiClient.post<User>("/accounts/api/v1/users", userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, ...userData }: Partial<User> & { id: string }) =>
			apiClient.put<User>(`/accounts/api/v1/users/${id}`, userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
