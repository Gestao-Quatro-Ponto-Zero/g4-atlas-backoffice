
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User, UserFilters, UsersResponse, CreateUserRequest, UpdateUserRequest } from "@/types/user";

export const useUsers = (filters: UserFilters = {}) => {
	return useQuery({
		queryKey: ["users", filters],
		queryFn: async (): Promise<UsersResponse> => {
			const params = new URLSearchParams();
			
			if (filters.page) params.append('page', filters.page.toString());
			if (filters.size) params.append('size', filters.size.toString());
			if (filters.email) params.append('email[eq]', filters.email);
			if (filters.name) params.append('name[like]', filters.name);
			if (filters.sort) params.append('sort', filters.sort);

			const response = await fetch(`https://api.g4educacao.com/accounts/api/v1/users?${params.toString()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch users');
			}

			return response.json();
		},
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (user: CreateUserRequest): Promise<User> => {
			const response = await fetch('https://api.g4educacao.com/accounts/api/v1/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});

			if (!response.ok) {
				throw new Error('Failed to create user');
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
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});

			if (!response.ok) {
				throw new Error('Failed to update user');
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
