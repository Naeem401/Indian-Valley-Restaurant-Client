import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/img/logo (2).png";
import useUserRole from "../Hooks/useUserRole";
import { useApp } from "../AppContext/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { language, toggleLanguage, user, logOut, cart } = useApp();
  const { role, isLoading } = useUserRole();

  const translations = {
    en: {
      menuItems: [
        { path: "/", label: "Home" },
        { path: "/menu", label: "Our Menu" },
        { path: "/contacts", label: "Contact Us" },
      ],
      login: "Login",
      logout: "Logout",
      toggleLang: "AR",
      dashboard: "Dashboard",
      cart: "Cart"
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
      dashboard: "لوحة التحكم",
      cart: "عربة التسوق"
    },
  };

  const currentTranslations = translations[language];
  const dashboardLink = role === "admin" ? "dashboard/admin-home" : "dashboard/customer-home";

  const linkClasses = (isActive) =>
    isActive
      ? "text-[#D99904]"
      : "hover:text-[#D99904] transition duration-300 ease-in-out";

  const handleLogout = () => {
    logOut();
      setDropdownOpen(false);
  };

  return (
    <nav className="bg-[#000000a2] text-white font-inter font-semibold text-lg fixed top-0 left-0 w-full z-50 shadow-md">
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
          <div className="hidden md:flex space-x-8 items-center">
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

          {/* Right Side Icons and Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon */}
            <NavLink 
              to="dashboard/customer-cart"
              className="relative hover:text-[#D99904] transition duration-300"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-2xl" />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </NavLink>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hover:text-[#D99904] transition duration-300"
              aria-label="Toggle Language"
            >
              {currentTranslations.toggleLang}
            </button>

            {/* User Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center bg-[#D99904] hover:bg-[#dbaa1a] text-black font-semibold py-2 px-4 rounded-full transition duration-300"
                  aria-label="User Menu"
                >
                  <FaUser className="mr-2" />
                  <span>{user?.displayName}</span>
                  <FaChevronDown className="ml-2" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
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
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      {currentTranslations.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-[#D99904] hover:bg-[#dbaa1a] text-white font-bold py-2 px-4 rounded transition duration-300">
                  {currentTranslations.login}
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <NavLink 
              to="dashboard/customer-cart"
              className="relative hover:text-[#D99904]"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-2xl" />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </NavLink>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-[#000000a2] z-40 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 h-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-white hover:text-[#D99904]"
              aria-label="Close Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4">
                {currentTranslations.menuItems.map(({ path, label }, index) => (
                  <NavLink
                    key={index}
                    to={path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-xl font-medium ${
                        isActive ? "text-[#D99904]" : "text-white hover:text-[#D99904]"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              <div className="space-y-4 pb-8">
                <button
                  onClick={toggleLanguage}
                  className="block w-full text-left px-3 py-2 rounded-md text-xl font-medium text-white hover:text-[#D99904]"
                >
                  {currentTranslations.toggleLang}
                </button>

                {user ? (
                  <>
                    <Link
                      to={dashboardLink}
                      className="block px-3 py-2 rounded-md text-xl font-medium text-white hover:text-[#D99904]"
                      onClick={() => setIsOpen(false)}
                    >
                      {currentTranslations.dashboard}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-xl font-medium text-white hover:text-[#D99904]"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      {currentTranslations.logout}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-xl font-medium text-white hover:text-[#D99904]"
                    onClick={() => setIsOpen(false)}
                  >
                    {currentTranslations.login}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;