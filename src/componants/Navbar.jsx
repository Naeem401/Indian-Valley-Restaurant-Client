import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/logo (2).png";
import { useAuth } from "../AuthProvider/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, user, logOut } = useAuth();

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
    },
  };

  const currentTranslations = translations[language];

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
            {user ? (
              <button
                onClick={logOut}
                className="bg-[#D99904] hover:bg-[#dbaa1a] text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                {currentTranslations.logout}
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-[#D99904] hover:bg-[#dbaa1a] text-white font-bold py-2 px-4 rounded transition duration-300">
                  {currentTranslations.login}
                </button>
              </Link>
            )}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3"
        >
          {currentTranslations.menuItems.map(({ path, label }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "block text-base font-medium text-[#D99904]"
                  : "block text-base font-medium text-white hover:text-[#D99904]"
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {user ? (
            <button
              onClick={() => {
                logOut();
                setIsOpen(false);
              }}
              className="bg-[#D99904] hover:bg-[#dbaa1a] text-[#151515] font-bold py-2 px-4 rounded w-full"
            >
              {currentTranslations.logout}
            </button>
          ) : (
            <Link to="/login">
              <button
                className="bg-[#D99904] hover:bg-[#dbaa1a] text-[#151515] font-bold py-2 px-4 rounded w-full"
                onClick={() => setIsOpen(false)}
              >
                {currentTranslations.login}
              </button>
            </Link>
          )}
          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="bg-gray-700 text-white py-2 px-4 rounded w-full"
          >
            {currentTranslations.toggleLang}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
