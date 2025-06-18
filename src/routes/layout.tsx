import { SideMenu } from '@/components/SideMenu'
import { Spinner } from '@/components/Spinner'
import { createFileRoute, useRouterState } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { type ReactNode, Suspense } from 'react'

const AnimatedRoute = ({ children }: { children: ReactNode }) => {
	const pathname = useRouterState({ select: (state) => state.location.pathname })
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
	)
}

export const Route = createFileRoute('/_layout')({
	component: () => {
		return (
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.2 }}
				className='grid min-h-screen grid-cols-[auto_1fr] bg-gray-50/40'
			>
				<SideMenu />
				<main className='px-8 py-6'>
					<AnimatePresence mode='wait'>
						<Suspense fallback={<Spinner />}>
							<AnimatedRoute>
								<Outlet />
							</AnimatedRoute>
						</Suspense>
					</AnimatePresence>
				</main>
			</motion.div>
		)
	},
})
