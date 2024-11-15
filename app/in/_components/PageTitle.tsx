import React from 'react'

interface TitleProps {
	title: string
}
export default function PageTitle({title}: TitleProps) {
	return <div className='text-xl font-bold mb-4'>{title}</div>;
}
