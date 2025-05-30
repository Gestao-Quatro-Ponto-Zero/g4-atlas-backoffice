import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar'
import { MenuFooter } from './MenuFooter'
import { MenuHeader } from './MenuHeader'
import { MenuItems } from './MenuItems'
import { Suspense } from 'react'
import { Spinner } from '@/components/Spinner'

export const DesktopMenu = () => {
	return (
		<SidebarProvider defaultOpen>
			<Sidebar variant='floating' className='hidden w-[220px] md:flex'>
				<Suspense fallback={<Spinner />}>
					<MenuHeader />
				</Suspense>
				<SidebarContent className='px-2 py-2'>
					<MenuItems />
				</SidebarContent>
				<MenuFooter />
			</Sidebar>
		</SidebarProvider>
	)
}
