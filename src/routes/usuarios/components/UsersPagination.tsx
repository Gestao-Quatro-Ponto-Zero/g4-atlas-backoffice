import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { Route } from '..'

export const UsersPagination = ({
	totalPages,
	onPageChange,
}: {
	totalPages: number
	onPageChange: (page: number) => void
}) => {
	const currentPage = Route.useSearch().page ?? 1
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1)
		}
	}

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1)
		}
	}

	const visiblePagesNumber = Math.min(5, totalPages)
	const isFirstVisiblePages = currentPage <= visiblePagesNumber - Math.min(2, totalPages - visiblePagesNumber)
	const isLastVisiblePages = currentPage >= totalPages - visiblePagesNumber + 3

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={handlePrevious}
						className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
					/>
				</PaginationItem>

				{Array.from({ length: visiblePagesNumber }, (_, i) =>
					isFirstVisiblePages
						? i + 1
						: isLastVisiblePages
							? totalPages - visiblePagesNumber + i + 1
							: currentPage - 2 + i
				).map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							onClick={() => onPageChange(page)}
							isActive={page === currentPage}
							className='cursor-pointer'
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						onClick={handleNext}
						className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
