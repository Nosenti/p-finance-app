import React from 'react';

interface BadgeProps {
	borderColor: string;
	title: string;
	amount: number;
}

export default function Badge({ borderColor, title, amount }: BadgeProps) {
	return (
		<div className={`pl-2 border-l-4`} style={{ borderColor: borderColor }}>
			<p className='text-muted-foreground'>{title}</p>
			<p>${amount}</p>

		</div>
	);
}
