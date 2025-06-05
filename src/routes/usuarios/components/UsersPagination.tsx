
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface UsersPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const UsersPagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: UsersPaginationProps) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={handlePrevious}
						className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
					/>
				</PaginationItem>
				
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							onClick={() => onPageChange(page)}
							isActive={page === currentPage}
							className="cursor-pointer"
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						onClick={handleNext}
						className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
