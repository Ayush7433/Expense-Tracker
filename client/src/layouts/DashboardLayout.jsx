import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='min-h-screen flex'>
        <Sidebar />

        <div className='flex-1 flex flex-col'>
            <Navbar />

            <main className='flex-1 p-4'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout