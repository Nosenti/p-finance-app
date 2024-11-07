import { ReactNode } from 'react'
import Sidebar from '../_components/Sidebar'

interface LayoutProps {
	children: ReactNode
}

export default function layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <main className="flex-1 h-full p-6 overflow-auto">
        {children}
      </main>
      </div>
  )
}
