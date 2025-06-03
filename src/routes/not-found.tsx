import { Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/$")({
	component: () => {
		const pathname = useRouterState({
			select: state => state.location.pathname,
		});

		useEffect(() => {
			console.error(
				"404 Error: User attempted to access non-existent route:",
				pathname,
			);
		}, [pathname]);

		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100">
				<div className="text-center">
					<h1 className="mb-4 font-bold text-4xl">404</h1>
					<p className="mb-4 text-gray-600 text-xl">Oops! Page not found</p>
					<Link
						to="/"
						className="text-blue-500 underline hover:text-blue-700"
					>
						Return to Home
					</Link>
				</div>
			</div>
		);
	},
});
