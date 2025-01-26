import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa"; // Importing the down arrow
import logo from "../assets/img/logo (2).png";
import { useAuth } from "../AuthProvider/AuthContext";
import useUserRole from "../Hooks/useUserRole";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const { language, toggleLanguage, user, logOut } = useAuth();
  const { role, isLoading } = useUserRole(); // Fetch role using the hook

  // Menu items translations
  const translations = {
    en: {
      menuItems: [
        { path: "/", label: "Home" },
        { path: "/menu", label: "Our Menu" },
        { path: "/contact", label: "Contact Us" },
      ],
      login: "Login",
      logout: "Logout",
      toggleLang: "AR",
      dashboard: "Dashboard", // Added dashboard text
    },
    ar: {
      menuItems: [
        { path: "/", label: "الرئيسية" },
        { path: "/menu", label: "قائمة الطعام" },
        { path: "/contact", label: "اتصل بنا" },
      ],
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      toggleLang: "EN",
      dashboard: "لوحة التحكم", // Added dashboard text
    },
  };

  const currentTranslations = translations[language];

  // Determine dashboard link based on user role
  const dashboardLink = role === "admin" ? "dashboard/admin-home" : "dashboard/myHome";

  // Function to determine active link styling
  const linkClasses = (isActive) =>
    isActive
      ? "text-[#D99904]"
      : "hover:text-[#D99904] transition duration-300 ease-in-out";

  return (
    <nav className="bg-[#000000a2] text-white font-inter font-semibold text-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Indian Valley Restaurant"
              className="h-28 w-auto"
            />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {currentTranslations.menuItems.map(({ path, label }, index) => (
              <NavLink
                key={index}
                to={path}
                className={({ isActive }) => linkClasses(isActive)}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Language Toggle and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Username with Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center bg-[#D99904] hover:bg-[#dbaa1a] text-black font-semibold py-2 px-4 rounded-full"
                >
                  <span>{user?.displayName}</span>
                  <FaChevronDown className="ml-2" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50"
                    style={{ top: "100%", right: "0" }}
                  >
                    {isLoading ? (
                      <div className="text-center px-4 py-2">Loading...</div>
                    ) : (
                      <Link
                        to={dashboardLink}
                        className="block px-4 py-2 text-sm text-center hover:bg-gray-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {currentTranslations.dashboard}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logOut();
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                    >
                      {currentTranslations.logout}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Login Button */}
            {!user && (
              <Link to="/login">
                <button className="bg-[#D99904] hover:bg-[#dbaa1a] text-white font-bold py-2 px-4 rounded transition duration-300">
                  {currentTranslations.login}
                </button>
              </Link>
            )}

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="text-white py-2 px-4 rounded transition duration-300"
            >
              {currentTranslations.toggleLang}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-white"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
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
              ) : (
                <svg
                  className="h-6 w-6"
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
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
