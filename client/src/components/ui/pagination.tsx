import { ReactNode, Dispatch, SetStateAction } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { generatePagination } from '@/utils/utils';
import { Button } from '@/components/ui';

export default function Pagination({ itemsPerPage, currentPage, setCurrentPage, totalItems }: {
	itemsPerPage: number,
	currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
	totalItems: number
}) {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const pagination = generatePagination(currentPage, totalPages);
	const isArrowHidden = pagination.length <= 5;
	
	return (
		<div className={'inline-flex'}>
			<PaginationArrow
				direction={'prev'}
				isDisabled={currentPage === 1}
				hidden={isArrowHidden}
				onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
			/>
			
			<div className={'-space-x-px'}>
				{pagination.map((page, idx) => (
					<PaginationNumber
						key={`${page}-${idx}`}
						page={page}
						isActive={currentPage === page}
						onClick={() => page !== '...' && setCurrentPage(page as number)}
					/>
				))}
			</div>
			
			<PaginationArrow
				direction={'next'}
				hidden={isArrowHidden}
				isDisabled={currentPage === totalPages}
				onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
			/>
		</div>
	);
}

function PaginationButton({ className, onClick, children }: {
	className: string,
  onClick: () => void,
	children: ReactNode
}) {
	return (
		<Button
			size={'icon'}
			variant={'outline'}
			className={className}
			onClick={onClick}
		>
			{children}
		</Button>
	);
}

function PaginationNumber({ page, isActive, onClick }: {
	page: number | string,
  isActive: boolean,
	onClick: () => void
}) {
	const className = clsx('border-0 shadow-none', {
		'hover:bg-transparent cursor-default': page === '...',
		'bg-gray-100 font-semibold': isActive
	});
	
	return (
		<PaginationButton
			className={className}
			onClick={onClick}
		>
			{page}
		</PaginationButton>
  );
}

function PaginationArrow({ direction, isDisabled, onClick, hidden }: {
	direction: 'prev' | 'next',
  isDisabled?: boolean,
	onClick: () => void,
	hidden: boolean
}) {
	const className = clsx('', {
		'pointer-events-none text-gray-300': isDisabled,
		'hover:bg-gray-100': !isDisabled,
		'mr-2 md:mr-4': direction === 'prev',
		'ml-2 md:ml-4': direction === 'next',
	});
	
	return (
		<>
			{!hidden && (
				<PaginationButton
					className={className}
					onClick={onClick}
				>
					{direction === 'prev' ? (
						<ChevronLeft className={'size-4'}/>
					) : (
						<ChevronRight className={'size-4'}/>
					)}
				</PaginationButton>
			)}
		</>
	);
}