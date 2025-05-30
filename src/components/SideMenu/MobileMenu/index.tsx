import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { MenuIcon } from 'lucide-react'
import { MobileMenuFooter } from './MobileMenuFooter'
import { MobileMenuHeader } from './MobileMenuHeader'
import { NavigationItems } from './NavigationItems'
import { UserProfile } from './UserProfile'

export const MobileMenu = () => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant='ghost' size='icon' className='md:hidden'>
					<MenuIcon className='h-5 w-5' />
					<span className='sr-only'>Abrir menu</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className='h-[95%]'>
				<DrawerHeader>
					<DrawerTitle className='sr-only'>Menu de navegação</DrawerTitle>
					<DrawerDescription className='sr-only'>Menu principal da aplicação</DrawerDescription>
				</DrawerHeader>
				<MobileMenuHeader />
				<UserProfile />
				<NavigationItems />
				<MobileMenuFooter />
			</DrawerContent>
		</Drawer>
	)
}
