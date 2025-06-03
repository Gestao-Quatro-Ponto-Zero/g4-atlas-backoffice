import { SideMenu } from "@/components/SideMenu";
import { Spinner } from "@/components/Spinner";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, Suspense } from "react";

const AnimatedRoute = ({ children }: { children: ReactNode }) => {
	const pathname = useRouterState({ select: state => state.location.pathname });
	return (
		<motion.div
			key={pathname}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.2 }}
		>
			{children}
		</motion.div>
	);
};

export const Route = createFileRoute("/_layout")({
	component: () => {
		return (
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.2 }}
				className="min-h-screen bg-gray-50/40"
			>
				<div className="flex w-full">
					<div className="hidden shrink-0 md:block">
						<SideMenu />
					</div>
					<div className="flex w-full grow flex-col">
						<main className="grow px-4 py-6 md:px-6 lg:px-8">
							<div className="contents md:hidden">
								<SideMenu />
							</div>
							<div className="md:hidden">
								<SideMenu />
							</div>
							<AnimatePresence mode="wait">
								<Suspense fallback={<Spinner />}>
									<AnimatedRoute>
										<Outlet />
									</AnimatedRoute>
								</Suspense>
							</AnimatePresence>
						</main>
					</div>
				</div>
			</motion.div>
		);
	},
});
