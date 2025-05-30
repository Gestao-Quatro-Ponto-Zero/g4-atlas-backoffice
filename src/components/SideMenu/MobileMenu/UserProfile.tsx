import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { use } from 'react'

export const UserProfile = () => {
	const { promise } = useAuth()
	const user = use(promise)
	const firstLetter = user?.name?.charAt(0) || 'U'

	return (
		<div className='flex flex-col items-center py-4'>
			<Avatar className='h-20 w-20 bg-[#ea384c] text-white text-xl'>
				<AvatarFallback>{firstLetter}</AvatarFallback>
			</Avatar>
			<h3 className='mt-4 font-medium text-base'>{user?.name}</h3>
			<p className='text-gray-500 text-sm'>{user?.email}</p>
		</div>
	)
}
