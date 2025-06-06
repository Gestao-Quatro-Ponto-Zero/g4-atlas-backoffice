export interface User {
	id: string;
	email: string;
	name: string;
	about?: string;
	job_title_id?: string;
	person_id?: string;
	status_id?: string;
	enabled: boolean;
	created_at?: string;
	updated_at?: string;
}

export interface CreateUserRequest {
	email: string;
	name: string;
	about?: string;
	job_title_id?: string;
	person_id?: string;
	status_id?: string;
	enabled: boolean;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

export interface UsersResponse {
	content: User[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	first: boolean;
	last: boolean;
}

export interface UserFilters {
	page?: number;
	size?: number;
	email?: string;
	name?: string;
	sort?: string;
}
