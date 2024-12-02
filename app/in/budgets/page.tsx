'use client';

import React from 'react'
import PageTitle from '../_components/PageTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/_components/ui/card';
import PieChart_ from '@/app/_components/PieChart';
import data from '@/app/_lib/data/data.json';
import Badge from '@/app/_components/Badge';
import IconCartRight from '@/public/assets/images/icon-caret-right.svg';
import { Progress } from '@/app/_components/ui/progress';
import Link from 'next/link';
import AddNewBudget from './_components/AddNewBudget';

export default function page() {
	const budgets = data.budgets;
  return (
		<div className='w-full'>
			<span className='flex justify-between'>
			  <PageTitle title='Budgets' />
			  <AddNewBudget/>
			</span>
			<div className='flex flex-col lg:flex-row gap-3 items-start mt-2'>
				<Card className='w-full lg:w-[40%]'>
					<CardContent className='flex flex-col md:flex-row lg:flex-col lg:gap-3 lg:pt-8 lg:justify-center'>
						<div className='chart md:w-full lg:flex lg:justify-center items-center'>
							<PieChart_ data={budgets} />
						</div>
						<div className='flex flex-col gap-2 px-4 md:w-[50%] lg:w-[100%]'>
							<p className='font-bold'>Spending Summary</p>
							{budgets.map((budget, index) => {
								return (
									<div
										key={budget.category}
										style={{ borderColor: budget.theme }}
										className=' flex justify-between'
									>
										<span
											className={` flex justify-between w-full py-2  ${
												index !== budgets.length - 1 ? 'border-b-2' : ''
											}`}
										>
											<p
												style={{ borderColor: budget.theme }}
												className='border-l-4 pl-2 text-muted-foreground'
											>
												{budget.category}
											</p>
											<div className='flex items-center'>
												<p className='flex items-center gap-1'>
													<span className='font-bold'>${50.0} </span>

													<span className='text-muted-foreground text-sm'>
														{' '}
														of ${budget.maximum.toFixed(2)}
													</span>
												</p>
											</div>
										</span>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
				<div className='w-full lg:w-[60%] flex flex-col gap-3'>
					{budgets.map((budget, index) => {
						return (
							<Card key={index} className=''>
								<CardHeader>
									<CardTitle className='flex justify-between'>
										<span className='flex items-center gap-3'>
											<div
												className='h-3 w-3 rounded-[50%] flex justify-center items-center'
												style={{
													backgroundColor: budget.theme,
													color: budget.theme
												}}
											></div>
											<span>{budget.category}</span>
										</span>
										<span className='text-muted-foreground'>...</span>
									</CardTitle>
								</CardHeader>
								<CardContent className=''>
									<span className='text-muted-foreground'>
										{`Maximum of $${budget.maximum}`}
									</span>
									<div className='flex flex-col gap-3'>
										<Progress
											value={(50 / budget.maximum) * 100}
											color={budget.theme}
											className='flex items-center border-4 border-background h-8'
										/>

										<span className='flex'>
											<span className='w-[50%]'>
												<Badge
													borderColor={budget.theme}
													title='Spent'
													amount={50}
												/>
											</span>

											<Badge
												borderColor='#F8F4F0'
												title='Free'
												amount={budget.maximum - 50}
											/>
										</span>
									</div>
									<div>
										<Card className='bg-background mt-4'>
											<CardHeader className='flex flex-row justify-between items-center'>
												<CardTitle>Latest Spending</CardTitle>
												<CardDescription>
													<Link
														href='#'
														className='flex gap-3 items-center hover:text-primary/90'
													>
														<span>See All</span>{' '}
														<span className='text-sm'>
															<IconCartRight />
														</span>
													</Link>
												</CardDescription>
											</CardHeader>
											<CardContent>
												{[
													{
														name: 'Q Software',
														amount: 30,
														date: '16 Aug 2024'
													},
													{
														name: 'Q Software',
														amount: 30,
														date: '16 Aug 2024'
													},
													{
														name: 'Q Software',
														amount: 30,
														date: '16 Aug 2024'
													}
												].map((el, index) => (
													<div
														key={index}
														className='flex justify-between items-center [&:not(:last-child)]:border-b-2 py-2'
													>
														<p className='text-sm font-bold'>{el.name}</p>
														<div>
															<span className='flex justify-end font-bold'>
																-${el.amount}
															</span>
															<span className='text-sm text-muted-foreground'>
																{el.date}
															</span>
														</div>
													</div>
												))}
											</CardContent>
										</Card>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
