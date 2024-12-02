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
	SortingState,
	useReactTable
} from '@tanstack/react-table';
import PageTitle from '../_components/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import data from '@/app/_lib/data/data.json';
import Image from 'next/image';
import { intlFormat } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import IconRecurringBills from '@/public/assets/images/icon-recurring-bills.svg';
import { Input } from '@/app/_components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu';
import { Button } from '@/app/_components/ui/button';
import IconSortMobile from '@/public/assets/images/icon-sort-mobile.svg';
import { ChevronDown } from 'lucide-react';

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
			<div className='flex w-[100%] justify-between py-4'>
				<div className='flex flex-col gap-2'>
					<span className='flex gap-3 items-center'>
						<Image
							src={`/${row.original.avatar}`}
							width={30}
							height={30}
							alt={row.original.name}
							className='rounded-[50%]'
						/>
						<span className='flex flex-col'>
							<span className='font-bold'>{row.original.name}</span>
						</span>
					</span>

					<span className='text-muted-foreground'>
						{intlFormat(row.original.date, {
							day: 'numeric',
							month: 'short',
							year: 'numeric'
						})}
					</span>
				</div>
				<div className='flex justify-end items-end'>
					<span
						className={`font-bold ${
							row.original.amount > 0 ? 'text-secondary_green' : ''
						}`}
					>
						{row.original.amount < 0
							? `-$${Math.abs(row.original.amount)}`
							: `+$${row.original.amount}`}
					</span>
				</div>
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
			<div className='flex flex-col lg:flex-row gap-3'>
				<div className='flex flex-col md:flex-row lg:flex-col gap-3 lg:w-[40%]'>
					<Card className='bg-primary flex items-center pt-8 pb-2 md:w-[50%] lg:w-full'>
						<CardContent className='flex items-center md:items-start gap-3 text-white md:flex-col'>
							<IconRecurringBills />
							<span className='text-white flex flex-col gap-2 md:mt-6'>
								<p className='text-sm'>Total Bills</p>
								<p className='text-xl font-bold'>$384.98</p>
							</span>
						</CardContent>
					</Card>
					<Card className='md:w-[50%] lg:w-full'>
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>

						<CardContent>
							<div className='[&_div:not(:last-child)]:border-b'>
								<div className='flex justify-between py-3'>
									<p className='text-sm text-muted-foreground'>Paid Bills</p>
									<p className='font-bold'>2($320.00)</p>
								</div>
								<div className='flex justify-between py-3'>
									<p className='text-sm text-muted-foreground'>Total Upcoming</p>
									<p className='font-bold'>4($320.00)</p>
								</div>
								<div className='flex justify-between py-3'>
									<p className='text-sm text-destructive'>Due Soon</p>
									<p className='font-bold text-destructive'>2($320.00)</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className='lg:w-[60%] bg-white px-2 rounded-lg'>
					<div className='flex py-4 px-2 justify-between'>
						<Input
							placeholder='Search bills'
							value={table.getState().globalFilter ?? ''}
							onChange={(event) => table.setGlobalFilter(event.target.value)}
							className=' w-[80%] md:w-[50%] border border-black/50'
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
													{sorting[0]?.id === 'date' &&
													sorting[0]?.desc === true
														? 'Latest'
														: sorting[0]?.id === 'date' &&
														  sorting[0]?.desc === false
														? 'Oldest'
														: sorting[0]?.id === 'name' &&
														  sorting[0]?.desc === false
														? 'A to Z'
														: sorting[0]?.id === 'name' &&
														  sorting[0]?.desc === true
														? 'Z to A'
														: sorting[0]?.id === 'amount' &&
														  sorting[0]?.desc === true
														? 'Highest'
														: sorting[0]?.id === 'amount' &&
														  sorting[0]?.desc === false
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
											{
												label: 'Latest',
												action: () => setSorting([{ id: 'date', desc: true }])
											},
											{
												label: 'Oldest',
												action: () => setSorting([{ id: 'date', desc: false }])
											},
											{
												label: 'A to Z',
												action: () => setSorting([{ id: 'name', desc: false }])
											},
											{
												label: 'Z to A',
												action: () => setSorting([{ id: 'name', desc: true }])
											},
											{
												label: 'Highest',
												action: () => setSorting([{ id: 'amount', desc: true }])
											},
											{
												label: 'Lowest',
												action: () =>
													setSorting([{ id: 'amount', desc: false }])
											}
										].map((el, index, array) => {
											const isSelected =
												(sorting[0]?.id === 'date' &&
													sorting[0]?.desc === true &&
													el.label === 'Latest') ||
												(sorting[0]?.id === 'date' &&
													sorting[0]?.desc === false &&
													el.label === 'Oldest') ||
												(sorting[0]?.id === 'name' &&
													sorting[0]?.desc === false &&
													el.label === 'A to Z') ||
												(sorting[0]?.id === 'name' &&
													sorting[0]?.desc === true &&
													el.label === 'Z to A') ||
												(sorting[0]?.id === 'amount' &&
													sorting[0]?.desc === true &&
													el.label === 'Highest') ||
												(sorting[0]?.id === 'amount' &&
													sorting[0]?.desc === false &&
													el.label === 'Lowest');
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
