'use client';
import React, { ReactNode, useEffect, useRef } from 'react'
import { CircleX } from 'lucide-react';

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(function () {
		function handleClick(e: MouseEvent) {
			if (ref.current && !(ref.current as HTMLElement).contains(e.target as Node)) onClose();

			if (ref.current && !ref.current.contains(e.target as Node)) onClose();
		}
		document.addEventListener('click', handleClick)

		return document.removeEventListener("click", handleClick)
	}, [onClose])
	return (
		<div className='fixed top-0 left-0 w-[100%] h-full bg-black/30 z-10'>
			<div ref={ ref} className='fixed left-[50%] top-[50%] bg-white p-4 rounded-lg shadow-md translate-x-[-50%] translate-y-[-50%] lg:max-w-[50%]'>
				<button onClick={onClose} className='fixed right-4 top-4'><CircleX/></button>
				<div>{children}</div>
			</div>
		</div>
	);
}
