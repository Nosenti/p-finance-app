import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/app/_components/ui/card';
import IconPot from '@/public/assets/images/icon-pot.svg';
import IconCartRight from '@/public/assets/images/icon-caret-right.svg';
import data from '@/app/_lib/data/data.json';
import Image from 'next/image';
import { intlFormat } from 'date-fns';
import PieChart_ from '@/app/_components/PieChart';
import Badge from '@/app/_components/Badge';
import Link from 'next/link';
import PageTitle from '../_components/PageTitle';


export default function page() {

	const pots = data.pots;
	const transactions = data.transactions;
	const budgets = data.budgets;
	const balance = data.balance;
	const potsSum = pots.reduce((acc, pot) => acc + pot.total, 0);
	const firstTransactions = transactions.slice(0, 5);
	return (
		<div className='w-full'>
			<PageTitle title='Overview' />
			<div className='cards flex flex-col md:flex-row gap-3 lg:gap-5 w-full lg:mb-2'>
				<Card className='bg-black text-white flex-1'>
					<CardHeader>
						<CardDescription>Current Balance</CardDescription>
					</CardHeader>
					<CardContent>
						<h1 className='text-xl font-bold'>${balance.current}</h1>
					</CardContent>
				</Card>
				<Card className='bg-white text-black flex-1'>
					<CardHeader>
						<CardDescription>Income</CardDescription>
					</CardHeader>
					<CardContent>
						<h1 className='text-xl font-bold'>${balance.income}</h1>
					</CardContent>
				</Card>
				<Card className='bg-white text-black flex-1'>
					<CardHeader>
						<CardDescription>Expenses</CardDescription>
					</CardHeader>
					<CardContent>
						<h1 className='text-xl font-bold'>${balance.expenses}</h1>
					</CardContent>
				</Card>
			</div>
			<div className='lg:flex justify-between lg:gap-5'>
				<div className='lg:w-[60%] '>
					<Card className='bg-white text-black flex-1 my-3 lg:my-5'>
						<CardHeader className='flex flex-row justify-between'>
							<CardTitle>Pots</CardTitle>
							<CardDescription>
								<Link
									href='/in/pots'
									className='flex gap-3 items-center hover:text-primary/90'
								>
									<span>See Details</span>{' '}
									<span className='text-sm'>
										<IconCartRight />
									</span>
								</Link>
							</CardDescription>
						</CardHeader>
						<CardContent className='flex flex-col md:flex-row md:gap-3 '>
							<div className='mb-4 md:w-[40%] mr-2'>
								<div>
									<Card className=''>
										<CardContent className='bg-background flex py-6 rounded-xl'>
											<span className='flex items-center mr-4'>
												{React.cloneElement(<IconPot />, {
													className: 'text-secondary_green'
												})}
											</span>
											<div className='flex flex-col gap-2'>
												<p className='text-muted-foreground'>Total Saved</p>
												<p className='font-bold text-lg'>${potsSum}</p>
											</div>
										</CardContent>
									</Card>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-3 md:w-[60%]'>
								{pots.map((pot) => {
									return (
										<Badge
											key={pot.name}
											borderColor={pot.theme}
											title={pot.name}
											amount={pot.total}
										/>
									);
								})}
							</div>
						</CardContent>
					</Card>
					<Card className='bg-white text-black flex-1 my-3'>
						<CardHeader className='flex flex-row justify-between'>
							<CardTitle>Transactions</CardTitle>
							<CardDescription>
								<Link
									href='/in/transactions'
									className='flex gap-3 items-center hover:text-primary/90'
								>
									<span>View All</span>{' '}
									<span className='text-sm'>
										<IconCartRight />
									</span>
								</Link>
							</CardDescription>
						</CardHeader>
						<CardContent>
							{firstTransactions.map((t, index) => {
								return (
									<div
										key={index}
										className='flex gap-3 [&:not(:last-child)]:mb-2 [&:not(:last-child)]:border-b-2 py-3'
									>
										<span className='w-[10%]'>
											<Image
												src={`/${t.avatar}`}
												width={50}
												height={50}
												alt={t.name}
												className='rounded-[50%]'
											/>
										</span>
										<span className='w-[60%] justify-start font-bold flex items-center'>
											{t.name}
										</span>
										<div className='flex flex-col w-[30%] justify-end'>
											<span
												className={`${
													t.amount > 0 ? ' text-secondary_green' : ''
												} font-bold flex justify-end`}
											>
												{t.amount < 0
													? `-$${Math.abs(t.amount)}`
													: `+$${t.amount}`}
											</span>
											<p className='text-muted-foreground text-sm flex justify-end'>
												{intlFormat(t.date, {
													day: 'numeric',
													month: 'short',
													year: 'numeric'
												})}
											</p>
										</div>
									</div>
								);
							})}
						</CardContent>
					</Card>
				</div>
				<div className='lg:w-[40%]'>
					<Card className='bg-white text-black flex-1 my-3 lg:my-5'>
						<CardHeader className='flex flex-row justify-between'>
							<CardTitle>Budgets</CardTitle>
							<CardDescription>
								<Link
									href='/in/budgets'
									className='flex gap-3 items-center hover:text-primary/90'
								>
									<span>See Details</span>{' '}
									<span className='text-sm'>
										<IconCartRight />
									</span>
								</Link>
							</CardDescription>
						</CardHeader>
						<CardContent className='md:flex'>
							<div className='chart md:w-[60%]'>
								<PieChart_ data={budgets} />
							</div>
							<div className='grid grid-cols-2 gap-3 md:w-[40%] md:grid-cols-1 md:justify-end'>
								{budgets.map((budget) => {
									return (
										<Badge
											key={budget.category}
											borderColor={budget.theme}
											title={budget.category}
											amount={budget.maximum}
										/>
									);
								})}
							</div>
						</CardContent>
					</Card>
					<Card className='bg-white text-black flex-1 mb-12'>
						<CardHeader className='flex flex-row justify-between'>
							<CardTitle>Recurring Bills</CardTitle>
							<CardDescription>
								<Link
									href='/in/recurring-bills'
									className='flex gap-3 items-center hover:text-primary/90'
								>
									<span>See Details</span>{' '}
									<span className='text-sm'>
										<IconCartRight />
									</span>
								</Link>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='bills'>
								<div className='bg-background h-full flex justify-between border-l-4 px-4 py-3 border-secondary_green rounded-md mb-2'>
									<span className='text-muted-foreground'>Paid Bills</span>
									<span className='font-bold'>$190.00</span>
								</div>
								<div className='bg-background h-full flex justify-between border-l-4 px-4 py-3 border-secondary_yellow rounded-md mb-2'>
									<span className='text-muted-foreground'>Total Upcoming</span>
									<span className='font-bold'>$148.98</span>
								</div>
								<div className='bg-background h-full flex justify-between border-l-4 px-4 py-3 border-secondary_cyan rounded-md'>
									<span className='text-muted-foreground'>Due Soon</span>
									<span className='font-bold'>$59.89</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
