import { Button } from '@/app/_components/ui/button';
import { Label } from '@/app/_components/ui/label';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { Input } from '@/app/_components/ui/input';

interface NewBudgetFormProps {
  onCloseModal?: () => void;
}

export default function NewBudgetForm({ onCloseModal }: NewBudgetFormProps) {
	return (
		<div className='flex flex-col w-full p-4'>
			<p className='font-bold mb-2'>Add New Budget</p>
			<p className='text-sm text-muted-foreground'>
				Choose a category to set a spending budget. These categories can help
				you monitor spending.
			</p>
			<div className='flex flex-col relative'>
				<Label
					htmlFor='category'
					className='font-semibold text-gray-500 text-sm mt-2 mb-1'
				>
					Budget Category
				</Label>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='p-2 border border-black/50 flex w-full justify-between items-center'
						>
							<span>Hello</span>
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='start'
						sideOffset={4}
						className='w-[var(--radix-dropdown-trigger-width)] bg-white p-0'
					>
						{['first', 'second', 'third'].map((el, index) => {
							return (
								<DropdownMenuItem
									key={index}
									className='flex w-full hover:bg-gray-100 cursor-pointer'
								>
									<span className='w-full'>{el}</span>
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
				<Label
					htmlFor='category'
					className='font-semibold text-gray-500 text-sm  mt-2 mb-1'
				>
					Maximum Speed
				</Label>
				<Input />
				<Label
					htmlFor='category'
					className='font-semibold text-gray-500 text-sm  mt-2 mb-1'
				>
					Theme
				</Label>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='p-2 border border-black/50 flex w-full justify-between items-center'
						>
							<span>Hello</span>
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='start'
						sideOffset={4}
						className='w-[var(--radix-dropdown-trigger-width)] bg-white p-0'
					>
						{['first', 'second', 'third'].map((el, index) => {
							return (
								<DropdownMenuItem
									key={index}
									className='flex w-full hover:bg-gray-100 cursor-pointer'
								>
									<span className='w-full'>{el}</span>
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Button className='mt-6' onClick={() => onCloseModal?.()}>
				Add Budget
			</Button>
		</div>
	);
}
