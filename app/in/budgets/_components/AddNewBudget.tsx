"use client";
import Modal from '@/app/_components/Modal';
import { Button } from '@/app/_components/ui/button';
import React, { useState } from 'react'
import NewBudgetForm from './NewBudgetForm';

export default function AddNewBudget() {
	const [isOpenModal, setIsOpenModal] = useState(false);
  return (
		<div>
			<Button onClick={() => setIsOpenModal((show) => !show)}>
				+ Add New Budget
			</Button>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<NewBudgetForm onCloseModal={() => setIsOpenModal((show) => !show)} />
				</Modal>
			)}
		</div>
	);
}
