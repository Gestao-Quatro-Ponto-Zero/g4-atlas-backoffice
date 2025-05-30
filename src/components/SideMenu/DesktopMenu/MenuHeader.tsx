import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { SidebarHeader } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { use } from 'react'

export const MenuHeader = () => {
	const { promise } = useAuth()
	const user = use(promise)
	const firstLetter = user?.name?.charAt(0) || 'U'

	return (
		<SidebarHeader className='flex flex-col items-center px-2 py-4'>
			<div className='flex items-center pb-4'>
				<img
					src='/lovable-uploads/c078ae70-9089-43ad-8657-a628953d196f.png'
					alt='G4 Educação Logo'
					className='h-6 w-auto'
				/>
			</div>

			<Avatar className='h-16 w-16 bg-[#ea384c] text-white text-xl'>
				<AvatarFallback>{firstLetter}</AvatarFallback>
			</Avatar>
			<h3 className='mt-3 font-medium text-sm'>{user?.name}</h3>
			<p className='text-gray-500 text-xs'>{user?.email}</p>
		</SidebarHeader>
	)
}
