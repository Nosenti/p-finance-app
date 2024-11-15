'use client';

import React, { useMemo, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/app/_components/ui/table';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
import data_ from '@/app/_lib/data/data.json';
import Image from 'next/image';
import { Button } from '@/app/_components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { intlFormat } from 'date-fns';
import { Input } from '@/app/_components/ui/input';

const columns: ColumnDef<{
	avatar: string;
	name: string;
	category: string;
	date: string;
	amount: number;
	recurring: boolean;
}>[] = [
	{
		id: 'name',
		header: 'Recipient/Sender',
		accessorKey: 'name',
		cell: ({ row }) => (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Image
					src={`/${row.original.avatar}`}
					width={50}
					height={50}
					alt={row.original.name}
					className='rounded-[50%]'
				/>
				<span className='font-bold'>{row.original.name}</span>
			</div>
		)
	},
	{
		id: 'category',
		header: 'Category',
		accessorKey: 'category'
	},
	{
		id: 'date',
		header: 'Transaction Date',
		accessorKey: 'date',
		cell: ({ getValue }) => {
			return intlFormat(new Date(getValue() as string), {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			});
		}
	},
	{
		id: 'amount',
		header: 'Amount',
		accessorKey: 'amount'
	}
];

const transactions = data_.transactions;

export default function Page() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageSize: 10,
		pageIndex: 0
	});
	const cols = useMemo(() => columns, []);
	const data_ = useMemo(() => transactions, []);
	const table = useReactTable({
		columns: cols,
		data: data_,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		enableSorting: true,
		enableColumnFilters: true,
		state: {
			sorting,
			columnFilters,
			pagination
		},
		
	});

	return (
		<div>
			React Table Demo
			<div className='flex justify-between items-center py-4 w-full'>
				<div className='flex items-center space-x-2'>
					<span className='text-gray-700 font-semibold'>Sort by</span>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='ml-auto flex items-center'>
								{sorting[0]?.id || 'name'}
								<span>
									
								</span>
								<ChevronDown className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='start' className='bg-white'>
							{table
								.getAllColumns()
								.filter((column) => column.getCanSort())
								.map((column) => (
									<DropdownMenuItem
										key={column.id}
										onSelect={() => {
											const isDesc =
												sorting[0]?.id === column.id
													? !sorting[0]?.desc
													: false;
											setSorting([{ id: column.id, desc: isDesc }]);
										}}
										className='capitalize'
									>
										{column.id}
									</DropdownMenuItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<Input
					placeholder='Search by name'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='max-w-md border-gray-300'
				/>
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
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

				<TableBody>
					{table.getPaginationRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className='flex items-center justify-between space-x-2 py-4 px-4'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<div>
					{[...Array(table.getPageCount())].map((_, index) => (
						<Button
							key={index}
							variant='outline'
							size='sm'
							onClick={() => table.setPageIndex(index)}
							className={table.getState().pagination.pageIndex === index ? 'bg-blue-500 text-white' : ''}
						>
							{index + 1}
						</Button>
					))}
				</div>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
