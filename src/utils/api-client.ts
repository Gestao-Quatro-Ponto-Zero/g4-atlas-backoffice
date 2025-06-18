import type { paths } from '@/schema'
import createClient, { type MaybeOptionalInit, type PathBasedClient } from 'openapi-fetch'
import type { HttpMethod, RequiredKeysOf } from 'openapi-typescript-helpers'

type InitParam<Init> =
	RequiredKeysOf<Init> extends never ? [(Init & { [key: string]: unknown })?] : [Init & { [key: string]: unknown }]

type PathsForMethod<Method extends HttpMethod> = {
	[K in keyof paths]: Method extends keyof paths[K] ? (paths[K][Method] extends undefined ? never : K) : never
}[keyof paths]
class ApiClient {
	#baseClient = createClient<paths>({
		baseUrl: import.meta.env.VITE_ACCOUNTS_API_URL,
	})

	constructor() {
		this.#baseClient.use({
			onRequest: ({ request }) => {
				const apiKey = localStorage.getItem('accounts-api-key')
				if (apiKey) {
					request.headers.set('ACCOUNTS-API-KEY', apiKey)
				}
				return request
			},
		})
	}

	#genMethod<Method extends HttpMethod>(method: Method) {
		return new Proxy<{
			[Path in PathsForMethod<Method>]: (
				...params: InitParam<MaybeOptionalInit<paths[Path], Method>>
			) => Promise<NonNullable<Awaited<ReturnType<PathBasedClient<paths>[Path][Uppercase<Method>]>>['data']>>
		}>(this.#baseClient, {
			get(target, p) {
				return async (...params: InitParam<MaybeOptionalInit<paths[PathsForMethod<Method>], Method>>) => {
					const { data } = await target[method.toUpperCase()](p, ...params)
					return data as NonNullable<typeof data>
				}
			},
		})
	}

	post = this.#genMethod('post')
	get = this.#genMethod('get')
	put = this.#genMethod('put')
	delete = this.#genMethod('delete')
	patch = this.#genMethod('patch')
}

export const apiClient = new ApiClient()
