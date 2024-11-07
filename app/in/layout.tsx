import { ReactNode } from 'react'
import Sidebar from '../_components/Sidebar'
import NavBarBottom from '../_components/NavBarBottom'

interface LayoutProps {
	children: ReactNode
}

export default function layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <span className='hidden lg:flex'>
        <Sidebar />
      </span>  
      <main className="flex-1 h-full p-6 overflow-auto">
        {children}
      </main>
      <span className='lg:hidden w-full'>
        <NavBarBottom/>
      </span>
      </div>
  )
}
