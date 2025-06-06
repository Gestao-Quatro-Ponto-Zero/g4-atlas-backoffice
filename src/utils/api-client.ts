import createClient, {
	type Client,
	type MaybeOptionalInit,
} from "openapi-fetch";
import type { paths } from "../schema";
import type { RequiredKeysOf } from "openapi-typescript-helpers";

type InitParam<Init> = RequiredKeysOf<Init> extends never
	? [(Init & { [key: string]: unknown })?]
	: [Init & { [key: string]: unknown }];

const BASE_URL = "https://api.g4educacao.com";

class ApiClient<Paths extends {}> {
	#client: ReturnType<typeof createClient<Paths>>;

	constructor() {
		this.#client = createClient({
			baseUrl: BASE_URL,
		});
	}

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

	async get<Endpoint extends Parameters<Client<Paths>["GET"]>[0]>(
		endpoint: Endpoint,
	) {
		const { response, data } = await this.#client.GET(endpoint, {
			headers: this.#getHeaders(),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return data;
	}

	async post<Endpoint extends Parameters<Client<Paths>["POST"]>[0]>(
		endpoint: Endpoint,
		body: InitParam<MaybeOptionalInit<Paths[Endpoint], "post">>[0]["body"],
	) {
		const { response, data } = await this.#client.POST(endpoint, {
			headers: this.#getHeaders(),
			body,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return data;
	}

	async put<Endpoint extends Parameters<Client<Paths>["PUT"]>[0]>(
		endpoint: Endpoint,
		body: InitParam<MaybeOptionalInit<Paths[Endpoint], "put">>[0]["body"],
	) {
		const { response, data } = await this.#client.PUT(endpoint, {
			headers: this.#getHeaders(),
			body: body,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return data;
	}

	async delete(endpoint: Parameters<Client<Paths>["DELETE"]>[0]) {
		const { response, data } = await this.#client.DELETE(endpoint, {
			method: "DELETE",
			headers: this.#getHeaders(),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return data;
	}
}

export const apiClient = new ApiClient<paths>();
