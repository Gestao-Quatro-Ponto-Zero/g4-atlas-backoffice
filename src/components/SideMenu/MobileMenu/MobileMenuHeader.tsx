import { Button } from '@/components/ui/button'
import { DrawerClose } from '@/components/ui/drawer'
import { XIcon } from 'lucide-react'

export const MobileMenuHeader = () => {
	return (
		<div className='border-b p-4'>
			<div className='mb-4 flex items-center justify-between'>
				<div className='flex-1'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<img
								src='/lovable-uploads/c078ae70-9089-43ad-8657-a628953d196f.png'
								alt='G4 Educação Logo'
								className='h-6 w-auto object-contain'
							/>
						</div>
						<DrawerClose asChild>
							<Button variant='ghost' size='icon'>
								<XIcon className='h-4 w-4' />
							</Button>
						</DrawerClose>
					</div>
				</div>
			</div>
		</div>
	)
}
