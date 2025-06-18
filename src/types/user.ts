import type { apiClient } from '@/utils/api-client'

export type User = NonNullable<Awaited<ReturnType<(typeof apiClient)['get']['/v1/users']>>['content']>[number]

export type CreateUserRequest = Parameters<(typeof apiClient)['post']['/v1/users']>[0]

export type UpdateUserRequest = Parameters<(typeof apiClient)['patch']['/v1/users/{id}']>[0]

export type UsersResponse = Awaited<ReturnType<(typeof apiClient)['get']['/v1/users']>>

export type UserFilters = Parameters<(typeof apiClient)['get']['/v1/users']>[0]
