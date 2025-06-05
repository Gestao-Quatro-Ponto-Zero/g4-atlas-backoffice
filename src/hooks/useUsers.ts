
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User, UserFilters, UsersResponse, CreateUserRequest, UpdateUserRequest } from "@/types/user";

export const useUsers = (filters: UserFilters = {}) => {
	return useQuery({
		queryKey: ["users", filters],
		queryFn: async (): Promise<UsersResponse> => {
			// Mock data for now - replace with actual API call
			const mockUsers: User[] = [
				{
					id: "1",
					email: "user1@example.com",
					name: "Usuário 1",
					enabled: true,
					created_at: "2024-01-01T00:00:00Z",
				},
				{
					id: "2",
					email: "user2@example.com",
					name: "Usuário 2",
					enabled: false,
					created_at: "2024-01-02T00:00:00Z",
				},
			];

			return {
				content: mockUsers,
				totalElements: mockUsers.length,
				totalPages: 1,
				size: 10,
				number: 0,
				first: true,
				last: true,
			};
		},
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (user: CreateUserRequest): Promise<User> => {
			// Mock implementation - replace with actual API call
			return {
				id: Date.now().toString(),
				...user,
				created_at: new Date().toISOString(),
			};
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
			// Mock implementation - replace with actual API call
			return {
				id,
				email: user.email || "",
				name: user.name || "",
				enabled: user.enabled ?? true,
				...user,
				updated_at: new Date().toISOString(),
			};
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
