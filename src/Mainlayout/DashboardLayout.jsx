import { Outlet } from 'react-router-dom'
import Sidebar from '../componants/Dashboard/Sidebar'


const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64 bg-black'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout