'use client';
import React, { useState, useEffect } from 'react';
import SidebarButton from './SidebarButton';
import IconNavOverview  from '@/public/assets/images/icon-nav-overview.svg';
import IconNavBudgets from '@/public/assets/images/icon-nav-budgets.svg';
import IconNavPots from '@/public/assets/images/icon-nav-pots.svg';
import IconNavRecurringBills from '@/public/assets/images/icon-nav-recurring-bills.svg';
import IconNavTransactions from '@/public/assets/images/icon-nav-transactions.svg';
import Logo from '@/public/assets/images/logo-large.svg';
import LogoSmall from '@/public/assets/images/logo-small.svg';
import IconMinimizeMenu from '@/public/assets/images/icon-minimize-menu.svg';
// import { Button } from './ui/button';

export default function Sidebar() {
	const [isMinimized, setIsMinimized] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024); // Tailwind's 'lg' breakpoint
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Prevent expansion on small and medium screens
	useEffect(() => {
		if (isMobile) {
			setIsMinimized(true);
		}
	}, [isMobile]);

	return (
		<div
			className={`
        bg-primary text-white flex
        ${
					isMobile
						? 'flex-row w-full h-16 fixed bottom-0 left-0'
						: 'flex-col h-full'
				}
         items-center
        transition-all duration-300
      `}
		>
			{/* Logo Section (Hidden on small and medium screens) */}
			{!isMobile && (
				<div
					className={`flex items-center pt-6 mb-12 ${
						isMinimized ? 'justify-center' : 'pl-6'
					}`}
				>
					{isMinimized ? <LogoSmall /> : <Logo />}
				</div>
			)}
			<div className='flex flex-col h-full justify-between'>
				{/* Navigation Buttons */}
				<ul
					className={`flex ${
						isMobile ? 'flex-row w-full justify-around' : 'flex-col w-full'
					}`}
				>
					<li>
						<SidebarButton
							path='/in/overview'
							icon={<IconNavOverview />}
							isMinimized={isMinimized}
							isMobile={isMobile}
						>
							Overview
						</SidebarButton>
					</li>
					{/* Add other SidebarButtons here */}
					<li>
						<SidebarButton
							path='/in/transactions'
							icon={<IconNavTransactions />}
							isMinimized={isMinimized}
							isMobile={isMobile}
						>
							Transactions
						</SidebarButton>
					</li>
					<li>
						<SidebarButton
							path='/in/budgets'
							icon={<IconNavBudgets />}
							isMinimized={isMinimized}
							isMobile={isMobile}
						>
							Budgets
						</SidebarButton>
					</li>
					<li>
						<SidebarButton
							path='/in/pots'
							icon={<IconNavPots />}
							isMinimized={isMinimized}
							isMobile={isMobile}
						>
							Pots
						</SidebarButton>
					</li>
					<li>
						<SidebarButton
							path='/in/recurring-bills'
							icon={<IconNavRecurringBills />}
							isMinimized={isMinimized}
							isMobile={isMobile}
						>
							Recurring Bills
						</SidebarButton>
					</li>
				</ul>
				{/* Expand/Collapse Button (Hidden on small and medium screens) */}
				{!isMobile && (
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
				)}
			</div>
		</div>
	);
}
