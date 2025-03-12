import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../AppContext/AppContext'
import { FaSpinner } from 'react-icons/fa'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useApp()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
        <FaSpinner className="animate-spin text-4xl text-[#D99904]" />
      </div>
    );
  }
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute;