import { SideMenu } from '@/components/SideMenu'
import { Spinner } from '@/components/Spinner'
import { AnimatePresence, motion } from 'motion/react'
import { type ReactNode, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const AnimatedRoute = ({ children }: { children: ReactNode }) => {
	const location = useLocation()
	return (
		<motion.div
			key={location.pathname}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.2 }}
		>
			{children}
		</motion.div>
	)
}

export const Layout = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.2 }}
			className='min-h-screen bg-gray-50/40'
		>
			<div className='flex w-full'>
				<div className='shrink-0'>
					<SideMenu />
				</div>
				<div className='flex w-full grow flex-col'>
					<main className='grow px-4 py-6 md:px-6 lg:px-8'>
						<SideMenu />
						<AnimatePresence mode='wait'>
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
	)
}
