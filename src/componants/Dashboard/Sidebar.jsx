import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import AdminMenu from "./NavMenu/AdminMenu";
import MenuItem from "./NavMenu/MenuItem";
import { useAuth } from "../../AuthProvider/AuthContext";
import axios from "axios";
import logo from "../../assets/img/logo (2).png";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [role, setRole] = useState(null); // State to store user role
  const { user, logOut } = useAuth(); // Assuming user data is available from AuthContext

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    // Fetch user role based on email from AuthContext
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          // Fetch user data based on email
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/${user.email}`
          );
          setRole(data.role); // Set the role from the response data
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    if (user?.email) {
      fetchUserRole();
    }
  }, [user]); // Fetch the role whenever the user changes

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-black flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer">
            <Link to="/">
              <img src={logo} alt="" className="h-28 w-auto" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none"
        >
          {isActive ? (
         <svg
         className="h-8 w-8 text-white"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         aria-hidden="true"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="2"
           d="M4 6h16M4 12h16m-7 6h7"
         />
       </svg>
          ) : (
            
               <svg
               className="h-8 w-8 text-white"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               aria-hidden="true"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M6 18L18 6M6 6l12 12"
               />
             </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-black text-white w-64 space-y-6 px-2 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {role === "customer" && <h2>Customer Menu</h2>}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem label="Profile" address="/profile" icon={FcSettings} />

          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-[#D99904] hover:text-[#D99904] transition duration-300 ease-in-out"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
