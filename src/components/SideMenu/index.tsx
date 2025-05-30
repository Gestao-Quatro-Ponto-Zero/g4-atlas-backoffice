import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'

export const SideMenu = () => {
	return (
		<>
			<div className='contents md:hidden'>
				<MobileMenu />
			</div>
			<div className='hidden md:contents'>
				<DesktopMenu />
			</div>
		</>
	)
}
