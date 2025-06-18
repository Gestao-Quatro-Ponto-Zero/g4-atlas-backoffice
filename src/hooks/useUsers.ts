import { apiClient } from '@/utils/api-client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import type { CreateUserRequest, UpdateUserRequest } from '../types/user'

interface User {
	id: string
	email: string
	name: string
	[key: string]: unknown
}

interface UsersResponse {
	data: User[]
	[key: string]: unknown
}

export const useUsers = (
	{ page = 1, limit = 10, email, name, sort = 'id,ASC' } = {} as {
		page?: number
		limit?: number
		email?: string
		name?: string
		sort?: string
	}
) =>
	useSuspenseQuery({
		queryKey: ['users', page, limit, email, name, sort],
		queryFn: () =>
			apiClient.get['/v1/users']({
				params: {
					query: {
						page,
						size: limit,
						sort,
						...(email && { 'email[like]': email }),
						...(name && { 'name[like]': name }),
					},
				},
			}),
	})

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (userData: CreateUserRequest['body']) =>
			apiClient.post['/v1/users']({
				body: userData,
			}),
		onMutate: async (newUser) => {
			await queryClient.cancelQueries({ queryKey: ['users'] })
			const previousUsers = queryClient.getQueryData<UsersResponse>(['users'])

			queryClient.setQueryData<UsersResponse>(['users'], (old) => {
				const newData = {
					...old,
					data: [...(old?.data || []), { ...newUser, id: 'temp-id' } as User],
				}
				return newData
			})

			return { previousUsers }
		},
		onError: (_err, _newUser, context) => {
			queryClient.setQueryData(['users'], context?.previousUsers)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
		},
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, ...userData }: { id: UpdateUserRequest['params']['path']['id'] } & UpdateUserRequest['body']) =>
			apiClient.patch['/v1/users/{id}']({
				params: {
					path: { id },
				},
				body: userData,
			}),
		onMutate: async ({ id, ...userData }) => {
			await queryClient.cancelQueries({ queryKey: ['users'] })
			const previousUsers = queryClient.getQueryData<UsersResponse>(['users'])

			queryClient.setQueryData<UsersResponse>(['users'], (old) => {
				if (!old) return { data: [] }
				return {
					...old,
					data: old.data.map((user: User) => (user.id === id ? { ...user, ...userData } : user)),
				}
			})

			return { previousUsers }
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueryData(['users'], context?.previousUsers)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
		},
	})
}
