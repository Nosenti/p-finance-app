'use client';

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
import React, { useEffect, useMemo, useState } from 'react';
import data_ from '@/app/_lib/data/data.json';
import Image from 'next/image';
import { intlFormat } from 'date-fns';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem
} from '@/app/_components/ui/dropdown-menu';
import IconSortMobile from '@/public/assets/images/icon-sort-mobile.svg';
import IconFilterMobile from '@/public/assets/images/icon-filter-mobile.svg';
import { ChevronDown } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

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
			<div className='flex gap-2 items-center'>
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
		accessorKey: 'category',
		cell: ({ row }) => (
			<span className='text-muted-foreground'>{row.original.category}</span>
		)
	},
	{
		id: 'date',
		header: 'Transaction Date',
		accessorKey: 'date',
		cell: ({ getValue }) => (
			<span className='text-muted-foreground'>
				{intlFormat(new Date(getValue() as string), {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})}
			</span>
		)
	},
	{
		id: 'amount',
		header: 'Amount',
		accessorKey: 'amount',
		cell: ({ row }) => (
			<span
				className={`font-bold ${
					row.original.amount > 0 ? 'text-secondary_green' : ''
				}`}
			>
				{row.original.amount < 0
					? `-$${Math.abs(row.original.amount)}`
					: `+$${row.original.amount}`}
			</span>
		)
	}
];

const columnsMobile: ColumnDef<{
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
			<div className='flex gap-2 items-center'>
				<Image
					src={`/${row.original.avatar}`}
					width={50}
					height={50}
					alt={row.original.name}
					className='rounded-[50%]'
				/>
				<span className='flex flex-col'>
					<span className='font-bold'>{row.original.name}</span>
					<span className='text-muted-foreground'>{row.original.category}</span>
				</span>
			</div>
		)
	},
	{
		id: 'amount',
		header: 'Amount',
		accessorKey: 'amount',
		cell: ({ row }) => (
			<div className='flex flex-col items-end justify-center'>
				<span
					className={`font-bold ${
						row.original.amount > 0 ? 'text-secondary_green' : ''
					}`}
				>
					{row.original.amount < 0
						? `-$${Math.abs(row.original.amount)}`
						: `+$${row.original.amount}`}
				</span>
				<span className='text-muted-foreground'>
					{intlFormat(row.original.date, {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					})}
				</span>
			</div>
		)
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

	const isMobile = useMediaQuery({ maxWidth: 767 });
	const cols = useMemo(() => (isMobile ? columnsMobile : columns), [isMobile]);
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
		}
	});
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	if (!hydrated) {
		return null;
	}

	return (
		<div>
			<div className='text-xl font-bold mb-4'>Transactions</div>

			<div className='bg-white rounded-lg p-2'>
				<div className='flex py-4 px-2 justify-between'>
					<Input
						placeholder='Search...'
						value={table.getState().globalFilter ?? ''}
						onChange={(event) => table.setGlobalFilter(event.target.value)}
						className='md:w-[30%] border border-black/50'
					/>
					<div className='flex gap-1 '>
						<div className=''>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<span className='flex items-center gap-2'>
										<span className='hidden md:flex text-muted-foreground'>
											Sort by{' '}
										</span>
										<Button
											variant='ghost'
											className='p-2 md:border border-black/50'
										>
											<span className='md:hidden'>
												<IconSortMobile />
											</span>

											<span className='hidden md:flex'>
												{sorting[0]?.id === 'date' && sorting[0]?.desc === true
													? 'Latest'
													: sorting[0]?.id === 'date' && sorting[0]?.desc === false
													? 'Oldest'
													: sorting[0]?.id === 'name' && sorting[0]?.desc === false
													? 'A to Z'
													: sorting[0]?.id === 'name' && sorting[0]?.desc === true
													? 'Z to A'
													: sorting[0]?.id === 'amount' && sorting[0]?.desc === true
													? 'Highest'
													: sorting[0]?.id === 'amount' && sorting[0]?.desc === false
													? 'Lowest'
													: 'Latest'}
												<ChevronDown className='ml-2 h-4 w-4' />
											</span>
										</Button>
									</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align='end'
									className='flex flex-col justify-right w-full'
								>
									{[
										{ label: 'Latest', action: () => setSorting([{ id: 'date', desc: true }]) },
										{ label: 'Oldest', action: () => setSorting([{ id: 'date', desc: false }]) },
										{ label: 'A to Z', action: () => setSorting([{ id: 'name', desc: false }]) },
										{ label: 'Z to A', action: () => setSorting([{ id: 'name', desc: true }]) },
										{ label: 'Highest', action: () => setSorting([{ id: 'amount', desc: true }]) },
										{ label: 'Lowest', action: () => setSorting([{ id: 'amount', desc: false }]) }
									].map((el, index, array) => {

										const isSelected = (sorting[0]?.id === 'date' && sorting[0]?.desc === true && el.label === 'Latest') ||
											(sorting[0]?.id === 'date' && sorting[0]?.desc === false && el.label === 'Oldest') ||
											(sorting[0]?.id === 'name' && sorting[0]?.desc === false && el.label === 'A to Z') ||
											(sorting[0]?.id === 'name' && sorting[0]?.desc === true && el.label === 'Z to A') ||
											(sorting[0]?.id === 'amount' && sorting[0]?.desc === true && el.label === 'Highest') ||
											(sorting[0]?.id === 'amount' && sorting[0]?.desc === false && el.label === 'Lowest');
										return (
											<DropdownMenuItem
												className={
													index !== array.length - 1 ? 'border-b-2' : ''
												}
												key={index}
												onSelect={el.action}
											>
												<span className={isSelected ? 'font-bold' : ''}>
													{el.label}
												</span>
											</DropdownMenuItem>
										);
									})}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<span className='flex items-center gap-2'>
										<span className='hidden md:flex text-muted-foreground'>
											Category{' '}
										</span>
										<Button
											variant='ghost'
											className='p-2 md:border border-black/50'
										>
											<span className='md:hidden'>
												<IconFilterMobile />
											</span>

											<span className='hidden md:flex'>
												{String(columnFilters[0]?.value || 'All Transactions')}
												<ChevronDown className='ml-2 h-4 w-4' />
											</span>
										</Button>
									</span>
								</DropdownMenuTrigger>

								<DropdownMenuContent
									align='end'
									className='bg-white max-h-52 overflow-auto'
								>
									<DropdownMenuItem
										className='capitalize'
										onSelect={() => setColumnFilters([])}
									>
										All Transactions
									</DropdownMenuItem>
									{Array.from(new Set(transactions.map((t) => t.category))).map(
										(category, index, array) => (
											<DropdownMenuItem
												className={
													index !== array.length - 1
														? 'border-b-2 capitalize'
														: 'capitalize'
												}
												key={category}
												onSelect={() =>
													setColumnFilters([
														{ id: 'category', value: category }
													])
												}
											>
												{category}
											</DropdownMenuItem>
										)
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
				<Table>
					<TableHeader className='hidden md:table-header-group'>
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
					<TableBody className=''>
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
								className={
									table.getState().pagination.pageIndex === index
										? 'bg-primary text-white'
										: ''
								}
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
		</div>
	);
}
