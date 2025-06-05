
import createClient from "openapi-fetch";
import type { paths } from "../schema";

export const client = createClient<paths>({
	baseUrl: "https://api.g4educacao.com/accounts/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export default client;
