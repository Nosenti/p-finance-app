'use client';
import React, { useState } from 'react';
import SidebarButton from './SidebarButton';
import IconNavOverview  from '@/public/assets/images/icon-nav-overview.svg';
import IconNavBudgets from '@/public/assets/images/icon-nav-budgets.svg';
import IconNavPots from '@/public/assets/images/icon-nav-pots.svg';
import IconNavRecurringBills from '@/public/assets/images/icon-nav-recurring-bills.svg';
import IconNavTransactions from '@/public/assets/images/icon-nav-transactions.svg';
import Logo from '@/public/assets/images/logo-large.svg';
import LogoSmall from '@/public/assets/images/logo-small.svg';
import IconMinimizeMenu from '@/public/assets/images/icon-minimize-menu.svg';

export default function Sidebar() {
	const [isMinimized, setIsMinimized] = useState(false);

	return (
		<div
			className={`
        bg-primary text-white flex flex-col h-full
         items-center
        transition-all duration-300
      `}
		>
			{
				<div
					className={`flex items-center pt-6 mb-12 ${
						isMinimized ? 'justify-center' : 'pl-6'
					}`}
				>
					{isMinimized ? <LogoSmall /> : <Logo />}
				</div>
			}
			<div className='flex flex-col h-full justify-between'>
				
				<ul
					className={`flex flex-col w-full pr-2 mr-2`}
				>
					<li>
						<SidebarButton
							path='/in/overview'
							icon={<IconNavOverview />}
							isMinimized={isMinimized}
							
						>
							Overview
						</SidebarButton>
					</li>
					<li>
						<SidebarButton
							path='/in/transactions'
							icon={<IconNavTransactions />}
							isMinimized={isMinimized}
							
						>
							Transactions
						</SidebarButton>
					</li>
					<li>
						<SidebarButton
							path='/in/budgets'
							icon={<IconNavBudgets />}
							isMinimized={isMinimized}
							
						>
							Budgets
						</SidebarButton>
					</li>
					<li>
						<SidebarButton
							path='/in/pots'
							icon={<IconNavPots />}
							isMinimized={isMinimized}
							
						>
							Pots
						</SidebarButton>
					</li>
					<li>
						<SidebarButton
							path='/in/recurring-bills'
							icon={<IconNavRecurringBills />}
							isMinimized={isMinimized}
							
						>
							Recurring Bills
						</SidebarButton>
					</li>
				</ul>
				
				{
					<div className='flex mb-6'>
						<button
              onClick={() => setIsMinimized(!isMinimized)}
              className={`w-full flex pl-6 text-gray-300 hover:text-white ${!isMinimized ? 'justify-start': ''}`}
						>
							<IconMinimizeMenu
								className={`${isMinimized ? 'rotate-180' : ''}`}
							/>
						</button>
					</div>
				}
			</div>
		</div>
	);
}
