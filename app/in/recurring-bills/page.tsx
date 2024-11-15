'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import PageTitle from '../_components/PageTitle';
import { Card, CardContent } from '@/app/_components/ui/card';
import data from '@/app/_lib/data/data.json';
import Image from 'next/image';
import { intlFormat } from 'date-fns';
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

	const transactions = data.transactions;
	const seen = new Set();
	const uniqueVendors = transactions.filter((transaction) => {
		if (seen.has(transaction.name)) {
			return false;
		} else {
			seen.add(transaction.name);
			return true;
		}
	});
	const recurringBills = uniqueVendors.filter((t) => t.recurring === true);

export default function Page() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	

	const isMobile = useMediaQuery({ maxWidth: 767 });
	const cols = useMemo(() => (isMobile ? columnsMobile : columns), [isMobile]);
	const data_ = useMemo(() => recurringBills, []);
	const table = useReactTable({
		columns: cols,
		data: data_,
		
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
		<div className='w-full'>
			<span className='flex justify-between'>
				<PageTitle title='Recurring Bills' />
			</span>
			<div className='grid grid-cols-1 lg:grid-cols-2'>
				<div className='flex flex-col md:flex-row lg:flex-col gap-3'>
					<Card>Black Card</Card>
					<Card>
						<CardContent>White Card</CardContent>
					</Card>
				</div>
				<div>
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
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
