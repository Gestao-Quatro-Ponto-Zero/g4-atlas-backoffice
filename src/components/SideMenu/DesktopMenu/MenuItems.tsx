import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ChevronRightIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { getMenuItems } from '../menuItems'

export const MenuItems = () => {
	const location = useLocation()
	const menuItems = getMenuItems(location.pathname)

	return (
		<SidebarMenu>
			{menuItems.map((item) => (
				<SidebarMenuItem key={item.label}>
					<SidebarMenuButton asChild isActive={item.active}>
						<Link prefetch='intent' to={item.href} className='group/menu-button flex items-center justify-between'>
							<div className='flex items-center'>
								<item.icon className={cn('h-4 w-4', item.active ? 'text-[#ea384c]' : '')} />
								<span className='ml-2 text-sm'>{item.label}</span>
							</div>
							<ChevronRightIcon className='h-3 w-3 opacity-70' />
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	)
}
