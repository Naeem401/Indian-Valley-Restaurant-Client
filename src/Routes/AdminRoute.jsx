import { Navigate } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";
import { useApp } from "../AppContext/AppContext";
import { FaSpinner } from "react-icons/fa";

const AdminRoute = ({ children }) => {
  const { role, loading: roleLoading } = useUserRole(); // Get role and loading state
  const { loading: appLoading } = useApp(); // Get app-wide loading state

  // Show a loading spinner if user data or role is still loading
  if (appLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
        <FaSpinner className="animate-spin text-4xl text-[#D99904]" />
      </div>
    );
  }

  // Only allow access if the user is an admin
  if (role === "admin") return children;

  // Redirect non-admin users to dashboard
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;
