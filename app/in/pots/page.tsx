import React from 'react'
import PageTitle from '../_components/PageTitle';
import { Button } from '@/app/_components/ui/button';
import data from '@/app/_lib/data/data.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Progress } from '@/app/_components/ui/progress';

export default function page() {
	const pots = data.pots;
  return (
		<div className='w-full'>
			<span className='flex justify-between'>
				<PageTitle title='Budgets' />
				<Button>+ Add New Pot</Button>
			</span>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3'>
				{pots.map((pot, index) => (
					<Card key={index}>
						<CardHeader>
							<CardTitle className='flex justify-between'>
								<span className='flex items-center gap-3'>
									<div
										className='h-3 w-3 rounded-[50%] flex justify-center items-center'
										style={{
											backgroundColor: pot.theme,
											color: pot.theme
										}}
									></div>
									<span>{pot.name}</span>
								</span>
								<span className='text-muted-foreground'>...</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='flex justify-between mb-3'>
								<span className='text-muted-foreground text-sm'>
									Total Saved
								</span>
								<span className='font-bold'>${pot.total}</span>
							</div>
							<Progress
								value={(pot.total / pot.target) * 100}
								color={pot.theme}
							/>
							<div className='text-sm mt-1 flex justify-between'>
								<span className='font-bold'>
									{((pot.total / pot.target) * 100).toFixed(1)}%
								</span>
								<span className='text-muted-foreground'>
									Target of ${pot.target}
								</span>
							</div>
							<div className='flex justify-between gap-4 mt-4'>
								<Button className='w-[50%] bg-background text-grey-900 font-bold text-sm hover:bg-white hover:border hover:border-black'>
									+ Add Money
								</Button>
								<Button className='w-[50%] bg-background text-grey-900 font-bold text-sm hover:bg-white hover:border hover:border-black'>
									Withdraw
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
