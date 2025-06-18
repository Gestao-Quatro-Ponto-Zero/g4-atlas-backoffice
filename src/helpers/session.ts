// Helpers para gerenciamento de sessão e cookies

export interface AuthTokens {
	access_token: string
	refresh_token?: string
	expires_in?: number
}

export const destroySession = (): void => {
	// Remove todos os cookies de autenticação
	document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
	document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

	// Remove do localStorage se houver
	localStorage.removeItem('auth_tokens')
	localStorage.removeItem('user_data')
}

export const setAuthCookie = (tokens: AuthTokens): void => {
	const { access_token, refresh_token, expires_in = 3600 } = tokens

	// Calcula data de expiração (padrão: 1 hora)
	const expirationDate = new Date()
	expirationDate.setTime(expirationDate.getTime() + expires_in * 1000)

	// Define cookies com httpOnly simulado via flags seguras
	document.cookie = `access_token=${access_token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`

	if (refresh_token) {
		// Refresh token com duração maior (30 dias)
		const refreshExpiration = new Date()
		refreshExpiration.setTime(refreshExpiration.getTime() + 30 * 24 * 60 * 60 * 1000)
		document.cookie = `refresh_token=${refresh_token}; expires=${refreshExpiration.toUTCString()}; path=/; SameSite=Strict`
	}

	// Backup no localStorage para casos específicos
	localStorage.setItem('auth_tokens', JSON.stringify(tokens))
}

export const getAuthToken = (): string | null => {
	// Tenta pegar do cookie primeiro
	const cookies = document.cookie.split(';')
	const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('access_token='))

	if (tokenCookie) {
		return tokenCookie.split('=')[1] ?? null
	}

	// Fallback para localStorage
	const storedTokens = localStorage.getItem('auth_tokens')
	if (storedTokens) {
		try {
			const tokens = JSON.parse(storedTokens)
			return tokens.access_token
		} catch {
			return null
		}
	}

	return null
}

export const getRefreshToken = (): string | null => {
	// Tenta pegar do cookie primeiro
	const cookies = document.cookie.split(';')
	const refreshCookie = cookies.find((cookie) => cookie.trim().startsWith('refresh_token='))

	if (refreshCookie) {
		return refreshCookie.split('=')[1] ?? null
	}

	// Fallback para localStorage
	const storedTokens = localStorage.getItem('auth_tokens')
	if (storedTokens) {
		try {
			const tokens = JSON.parse(storedTokens)
			return tokens.refresh_token || null
		} catch {
			return null
		}
	}

	return null
}

export const redirectToSSO = (): void => {
	const loginUrl = import.meta.env.VITE_PUBLIC_LOGIN_URL
	const baseUrl = import.meta.env.VITE_BASE_URL

	if (!(loginUrl && baseUrl)) {
		console.error('SSO configuration missing: VITE_PUBLIC_LOGIN_URL or VITE_BASE_URL')
		return
	}

	// Salva a rota atual para redirecionamento pós-login
	const currentPath = window.location.pathname + window.location.search
	localStorage.setItem('pre_auth_route', currentPath)

	// Redireciona para SSO com callback URL
	const redirectUrl = `${baseUrl}/auth`
	const ssoUrl = `${loginUrl}?redirectUrl=${encodeURIComponent(redirectUrl)}`

	window.location.href = ssoUrl
}
