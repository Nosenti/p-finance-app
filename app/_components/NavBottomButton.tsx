import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode, ReactElement } from 'react';

interface SidebarButtonProps {
  children: ReactNode;
  icon: ReactElement;
  path: string;
  isMinimized?: boolean;
}

export default function NavBottomButton({
	children,
  icon,
  path,
}: SidebarButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`flex flex-col items-center bg-primary w-full px-5 py-2 cursor-pointer border-b-4 border-primary mt-2 rounded-t-md
        ${isActive ? 'bg-background bg-white text-foreground font-semibold border-secondary_green' : 'text-gray-300 hover:text-background'}
      `}
    >
      <span className="transition-colors">
        {React.cloneElement(icon, {
          className: `${isActive ? 'text-secondary_green' : 'text-gray-300'} h-6 w-6`,
        })}
		  </span>
		  <span className="hidden md:flex text-sm">
          {children}
        </span>
    </Link>
  );
}
