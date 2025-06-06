import { apiClient } from "@/utils/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
	id: string;
	name: string;
	email: string;
	phone?: string;
	enabled: boolean;
	created_at: string;
}

interface UsersResponse {
	content: User[];
	totalElements: number;
	totalPages: number;
	number: number;
	size: number;
}

interface UseUsersParams {
	page?: number;
	limit?: number;
	email?: string;
	name?: string;
	sort?: string;
}

export const useUsers = (params: UseUsersParams = {}) => {
	const {
		page = 1,
		limit = 10,
		email = "",
		name = "",
		sort = "id,ASC",
	} = params;

	const queryParams = new URLSearchParams({
		page: page.toString(), // API now uses 1-based pagination
		size: limit.toString(),
		sort,
		...(email && { email }),
		...(name && { name }),
	});

	return useQuery({
		queryKey: ["users", page, limit, email, name, sort],
		queryFn: () =>
			apiClient.get<UsersResponse>(`/accounts/api/v1/users?${queryParams}`),
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: Omit<User, "id" | "created_at">) =>
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
