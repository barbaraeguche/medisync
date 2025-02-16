import { ReactNode, Dispatch, SetStateAction } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generatePagination } from '@/utils/utils.ts';
import { MedicalHistory as MedicalHistoryType } from '@/lib/definitions.ts';
import Button from '@/ui/button.tsx';

export default function Pagination({ itemsPerPage, currentPage, setCurrentPage, medicalHistory }: {
	itemsPerPage: number,
	currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
	medicalHistory: MedicalHistoryType[]
}) {
	const totalPages = Math.ceil(medicalHistory.length / itemsPerPage);
	const pagination = generatePagination(currentPage, totalPages);
	
	return (
		<div className={'inline-flex'}>
			<PaginationArrow
				direction={'prev'}
				isDisabled={currentPage === 1}
				hidden={pagination.length <= 5}
				onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
			/>
			
			<div className={' -space-x-px'}>
				{pagination.map((page, idx) => (
					<PaginationNumber
						key={idx}
						page={page}
						isActive={currentPage === page}
						onClick={() => page !== '...' && setCurrentPage(page as number)}
					/>
				))}
			</div>
			
			<PaginationArrow
				direction={'next'}
				hidden={pagination.length <= 5}
				isDisabled={currentPage === totalPages}
				onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
			/>
		</div>
	);
}

function PaginationButton({ key, className, onClick, children }: {
	key?: number,
	className: string,
  onClick: () => void,
	children: ReactNode
}) {
	return (
		<Button
			key={key}
			size={'icon'}
			variant={'outline'}
			className={className}
			onClick={onClick}
		>
			{children}
		</Button>
	);
}

function PaginationNumber({ key, page, isActive, onClick }: {
	key: number,
	page: number | string,
  isActive: boolean,
	onClick: () => void
}) {
	const className = clsx('border-0 shadow-none', {
		'hover:bg-transparent cursor-default': page === '...',
		'bg-gray-100': isActive
	});
	
	return (
		<PaginationButton
			key={key}
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