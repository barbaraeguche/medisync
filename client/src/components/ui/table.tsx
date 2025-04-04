import {
	Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/shadcn/table';
import {
	ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable
} from '@tanstack/react-table';
import { Button } from '@/components/ui/index';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[],
	data: TData[]
}

export default function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});
	
	return (
		<div>
			<Table>
				<TableHeader className={'bg-gray-100'}>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
	            className={'bg-inherit hover:bg-inherit'}
						>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
		                  header.getContext()
										)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className={'bg-white'}>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className={'whitespace-nowrap'}
									>
										{flexRender(
		                  cell.column.columnDef.cell,
		                  cell.getContext(),
		                )}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
		          <TableCell
		            colSpan={columns.length}
		            className={'h-20 text-center'}
		          >
		            No results found.
		          </TableCell>
		        </TableRow>
					)}
				</TableBody>
			</Table>
			<div className={'flex items-center justify-between py-2'}>
				<div className={'text-sm font-medium text-gray-400 tracking-tight'}>
					{table.getPageCount() === 0
						? null
					  : (
							<span>
								Page {table.getState().pagination.pageIndex + 1} out of {table.getPageCount()}.
							</span>
						)}
				</div>
				
				{/* pagination buttons */}
				<div className={'space-x-1.5'}>
					<Button
						size={'sm'}
						variant={'outline'}
						className={'text-sm tracking-tight'}
						disabled={!table.getCanPreviousPage()}
						onClick={() => table.previousPage()}
					>
						Prev
					</Button>
					<Button
						size={'sm'}
						variant={'outline'}
						disabled={!table.getCanNextPage()}
						className={'text-sm tracking-tight'}
						onClick={() => table.nextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}