import createClient from "openapi-fetch";
import type { paths } from "../schema";

export const client = createClient<paths>({
	baseUrl: "http://localhost:8080/accounts/api/v3/api-docs",
	headers: {
		"Content-Type": "application/json",
	},
});

export default client;
