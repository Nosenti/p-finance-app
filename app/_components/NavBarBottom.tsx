'use client';
import React from 'react';
import NavBottomButton from './NavBottomButton';
import IconNavOverview  from '@/public/assets/images/icon-nav-overview.svg';
import IconNavBudgets from '@/public/assets/images/icon-nav-budgets.svg';
import IconNavPots from '@/public/assets/images/icon-nav-pots.svg';
import IconNavRecurringBills from '@/public/assets/images/icon-nav-recurring-bills.svg';
import IconNavTransactions from '@/public/assets/images/icon-nav-transactions.svg';


export default function NavBarBottom() {

	return (
				
				<ul
					className={`flex w-full justify-around bg-primary rounded-t-lg`}
				>
					<li>
						<NavBottomButton
							path='/in/overview'
							icon={<IconNavOverview />}
							
							
						>
							Overview
						</NavBottomButton>
					</li>
					<li>
						<NavBottomButton
							path='/in/transactions'
							icon={<IconNavTransactions />}
							
							
						>
							Transactions
						</NavBottomButton>
					</li>
					<li>
						<NavBottomButton
							path='/in/budgets'
							icon={<IconNavBudgets />}
							
							
						>
							Budgets
						</NavBottomButton>
					</li>
					<li>
						<NavBottomButton
							path='/in/pots'
							icon={<IconNavPots />}
							
							
						>
							Pots
						</NavBottomButton>
					</li>
					<li>
						<NavBottomButton
							path='/in/recurring-bills'
							icon={<IconNavRecurringBills />}
							
							
						>
							Recurring Bills
						</NavBottomButton>
					</li>
				</ul>
				

		
	);
}
