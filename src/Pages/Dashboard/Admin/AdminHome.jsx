import { useApp } from "../../../AppContext/AppContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {
  const { language } = useApp();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    totalOrders: 0,
  });

  // Fetch stats from the backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin-stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-[#1a1a1a] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">
        {language === "en" ? "Admin Dashboard" : "لوحة تحكم الأدمن"}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-[#313131] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Total Users" : "إجمالي المستخدمين"}
          </h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <p className="text-gray-400">
            {language === "en"
              ? "Number of registered users."
              : "عدد المستخدمين المسجلين."}
          </p>
        </div>

        {/* Total Sales Card */}
        <div className="bg-[#313131] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Total Sales" : "إجمالي المبيعات"}
          </h2>
          <p className="text-3xl font-bold">SAR {stats.totalSales.toFixed(2)}</p>
          <p className="text-gray-400">
            {language === "en"
              ? "Total revenue generated."
              : "إجمالي الإيرادات المحققة."}
          </p>
        </div>

        {/* Total Orders Card */}
        <div className="bg-[#313131] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Total Orders" : "إجمالي الطلبات"}
          </h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
          <p className="text-gray-400">
            {language === "en"
              ? "Number of orders placed."
              : "عدد الطلبات المقدمة."}
          </p>
        </div>
      </div>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Items Card */}
        <Link
          to="/dashboard/manage-items"
          className="bg-[#313131] p-6 rounded-lg hover:bg-[#3a3a3a] transition duration-300"
        >
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Manage Items" : "إدارة العناصر"}
          </h2>
          <p className="text-gray-400">
            {language === "en"
              ? "View and manage menu items."
              : "عرض وإدارة عناصر القائمة."}
          </p>
        </Link>

        {/* Add Items Card */}
        <Link
          to="/dashboard/add-items"
          className="bg-[#313131] p-6 rounded-lg hover:bg-[#3a3a3a] transition duration-300"
        >
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Add Items" : "إضافة عناصر"}
          </h2>
          <p className="text-gray-400">
            {language === "en"
              ? "Add new items to the menu."
              : "إضافة عناصر جديدة إلى القائمة."}
          </p>
        </Link>

        {/* Manage Bookings Card */}
        <Link
          to="/dashboard/manage-booking"
          className="bg-[#313131] p-6 rounded-lg hover:bg-[#3a3a3a] transition duration-300"
        >
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Manage Bookings" : "إدارة الحجوزات"}
          </h2>
          <p className="text-gray-400">
            {language === "en"
              ? "View and manage customer bookings."
              : "عرض وإدارة حجوزات العملاء."}
          </p>
        </Link>

        {/* Manage Users Card */}
        <Link
          to="/dashboard/manage-users"
          className="bg-[#313131] p-6 rounded-lg hover:bg-[#3a3a3a] transition duration-300"
        >
          <h2 className="text-xl font-bold text-[#D99904]">
            {language === "en" ? "Manage Users" : "إدارة المستخدمين"}
          </h2>
          <p className="text-gray-400">
            {language === "en"
              ? "View and manage user accounts."
              : "عرض وإدارة حسابات المستخدمين."}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;