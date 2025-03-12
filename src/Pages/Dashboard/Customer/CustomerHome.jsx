import { Link } from "react-router-dom";
import { useApp } from "../../../AppContext/AppContext";

const CustomerHome = () => {
  const { user, language } = useApp();

  return (
    <div className="p-6 bg-[#1a1a1a] min-h-screen text-white">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold mb-6">
        {language === "en" ? "Welcome," : "مرحبًا،"} {user?.name}
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cart Card */}
        <Link
          to="/dashboard/customer-cart"
          className="bg-[#313131] p-6 rounded-lg hover:bg-[#3a3a3a] transition duration-300"
        >
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Your Cart" : "سلة التسوق"}
          </h2>
          <p className="text-gray-400">
            {language === "en"
              ? "View and manage your cart."
              : "عرض وإدارة سلة التسوق الخاصة بك."}
          </p>
        </Link>

        {/* Order History Card */}
        <Link
          to="/dashboard/customer-orders"
          className="bg-[#313131] p-6 rounded-lg hover:bg-[#3a3a3a] transition duration-300"
        >
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Order History" : "تاريخ الطلبات"}
          </h2>
          <p className="text-gray-400">
            {language === "en"
              ? "View your past orders."
              : "عرض الطلبات السابقة الخاصة بك."}
          </p>
        </Link>

        {/* Profile Card */}
        <Link
          to="/dashboard/profile"
          className="bg-[#313131] p-6 rounded-lg hover:bg-[#3a3a3a] transition duration-300"
        >
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Profile" : "الملف الشخصي"}
          </h2>
          <p className="text-gray-400">
            {language === "en"
              ? "Update your profile information."
              : "تحديث معلومات ملفك الشخصي."}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CustomerHome;