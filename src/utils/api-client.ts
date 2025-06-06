const BASE_URL = "https://api.g4educacao.com";

class ApiClient {
	#getHeaders(): HeadersInit {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		// Get API key from localStorage directly since this is a singleton
		const apiKey = localStorage.getItem("accounts-api-key");
		if (apiKey) {
			headers["ACCOUNTS-API-KEY"] = apiKey;
		}

		return headers;
	}

	async get<T>(endpoint: string): Promise<T> {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "GET",
			headers: this.#getHeaders(),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "POST",
			headers: this.#getHeaders(),
			body: data ? JSON.stringify(data) : undefined,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async put<T>(endpoint: string, data?: unknown): Promise<T> {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "PUT",
			headers: this.#getHeaders(),
			body: data ? JSON.stringify(data) : undefined,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async delete<T>(endpoint: string): Promise<T> {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "DELETE",
			headers: this.#getHeaders(),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}
}

export const apiClient = new ApiClient();
