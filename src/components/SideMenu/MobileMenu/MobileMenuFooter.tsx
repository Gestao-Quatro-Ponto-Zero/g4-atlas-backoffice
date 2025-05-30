import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const MobileMenuFooter = () => {
	return (
		<div className='mt-auto p-6'>
			<div className='flex justify-center'>
				<Button variant='outline' className='rounded-full text-sm'>
					Ajuda
				</Button>
			</div>
			<div className='mt-6 flex justify-center space-x-4 text-gray-500 text-xs'>
				<Link prefetch='intent' to='/termos' className='hover:underline'>
					Termos
				</Link>
				<Link prefetch='intent' to='/privacidade' className='hover:underline'>
					Privacidade
				</Link>
				<Link prefetch='intent' to='/cookies' className='hover:underline'>
					Cookies
				</Link>
			</div>
		</div>
	)
}
