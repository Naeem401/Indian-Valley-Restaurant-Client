import { FaHome, FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdFlatware } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TbBrandBooking } from 'react-icons/tb'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaHome } label='Admain Home' address="admin-home" />
      <MenuItem icon={MdFlatware } label='Add Items' address='add-items' />
      <MenuItem icon={GiHamburgerMenu } label='Manage Items' address='manage-items' />
      <MenuItem icon={TbBrandBooking } label='Manage Bookings' address='manage-booking' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
    </>
  )
}

export default AdminMenu