import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ApiKeyProvider } from '@/contexts/ApiKeyContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000, // 5 minutes
			experimental_prefetchInRender: true,
		},
	},
})

// App component with proper provider nesting order
export const Route = createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<AuthProvider>
					<ApiKeyProvider>
						<Outlet />
					</ApiKeyProvider>
				</AuthProvider>
				<Sonner />
			</TooltipProvider>
			<ReactQueryDevtools />
			<TanStackRouterDevtools />
		</QueryClientProvider>
	),
})
