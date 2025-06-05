
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/utils/api-client";
import type { User, UsersResponse, CreateUserRequest, UpdateUserRequest, UserFilters } from "@/types/user";

export const useUsers = (filters: UserFilters = {}) => {
	const queryParams = new URLSearchParams();
	
	if (filters.page) queryParams.append("page", filters.page.toString());
	if (filters.size) queryParams.append("size", filters.size.toString());
	if (filters.email) queryParams.append("email[eq]", filters.email);
	if (filters.name) queryParams.append("name[like]", filters.name);
	if (filters.sort) queryParams.append("sort", filters.sort);

	return useQuery({
		queryKey: ["users", filters],
		queryFn: async (): Promise<UsersResponse> => {
			const response = await fetch(`https://api.g4educacao.com/accounts/api/v1/users?${queryParams}`);
			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}
			return response.json();
		},
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: async (user: CreateUserRequest): Promise<User> => {
			const response = await fetch("https://api.g4educacao.com/accounts/api/v1/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			if (!response.ok) {
				throw new Error("Failed to create user");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: async ({ id, user }: { id: string; user: UpdateUserRequest }): Promise<User> => {
			const response = await fetch(`https://api.g4educacao.com/accounts/api/v1/users/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			if (!response.ok) {
				throw new Error("Failed to update user");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
