import { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../../../AppContext/AppContext";
import { FaSpinner } from "react-icons/fa";

// Translations moved outside component
const translations = {
  en: {
    manageOrders: "Manage Orders",
    allStatuses: "All Statuses",
    pending: "Pending",
    accepted: "Accepted",
    completed: "Completed",
    canceled: "Canceled",
    allTypes: "All Types",
    pickup: "Pickup",
    delivery: "Delivery",
    dineIn: "Dine-in",
    allDates: "All Dates",
    today: "Today",
    week: "This Week",
    month: "This Month",
    newestFirst: "Newest First",
    oldestFirst: "Oldest First",
    totalLowToHigh: "Total: Low to High",
    totalHighToLow: "Total: High to Low",
    searchPlaceholder: "Search by name, ID, email, or phone...",
    orderId: "Order ID",
    customer: "Customer",
    total: "Total",
    orderDate: "Order Date",
    paymentMethod: "Payment Method",
    orderType: "Order Type",
    numberOfPeople: "Number of People",
    items: "Items",
    quantity: "Quantity",
    close: "Close",
    confirmAction: "Confirm Action",
    confirmActionMessage: "Are you sure you want to perform this action?",
    retry: "Retry",
    errorMessage: "Please try again.",
    accept: "Accept",
    cancel: "Cancel",
    complete: "Complete",
    email: "Email",
    phone: "Phone",
    confirm: "Confirm",
    orderDetails: "Order Details"
  },
  ar: {
    manageOrders: "إدارة الطلبات",
    allStatuses: "جميع الحالات",
    pending: "قيد الانتظار",
    accepted: "مقبول",
    completed: "مكتمل",
    canceled: "ملغى",
    allTypes: "جميع الأنواع",
    pickup: "استلام",
    delivery: "توصيل",
    dineIn: "تناول الطعام في المكان",
    allDates: "جميع التواريخ",
    today: "اليوم",
    week: "هذا الأسبوع",
    month: "هذا الشهر",
    newestFirst: "الأحدث أولاً",
    oldestFirst: "الأقدم أولاً",
    totalLowToHigh: "المجموع: من الأقل",
    totalHighToLow: "المجموع: من الأعلى",
    searchPlaceholder: "ابحث باستخدام الاسم، الرقم، البريد أو الهاتف...",
    orderId: "رقم الطلب",
    customer: "العميل",
    total: "المجموع",
    orderDate: "تاريخ الطلب",
    paymentMethod: "طريقة الدفع",
    orderType: "نوع الطلب",
    numberOfPeople: "عدد الأشخاص",
    items: "المنتجات",
    quantity: "الكمية",
    close: "إغلاق",
    confirmAction: "تأكيد الإجراء",
    confirmActionMessage: "هل أنت متأكد من رغبتك في تنفيذ هذا الإجراء؟",
    retry: "إعادة المحاولة",
    errorMessage: "يرجى المحاولة مرة أخرى.",
    accept: "قبول",
    cancel: "إلغاء",
    complete: "إتمام",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    confirm: "تأكيد",
    orderDetails: "تفاصيل الطلب"
  }
};

const ManageOrders = () => {
  const { language, toggleLanguage } = useApp();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [dateFilter, setDateFilter] = useState("all");
  const [actionConfirmation, setActionConfirmation] = useState(null);

  // Get translations for current language
  const t = translations[language];

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "accepted": return "bg-yellow-500";
      case "canceled": return "bg-gray-500";
      case "pending":
      default: return "bg-red-500";
    }
  };

  // Fetch orders with user details
  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders-with-users`);
      const sortedOrders = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (error) {
      let errorMessage = error.message;
      if (error.response?.data) {
        errorMessage = typeof error.response.data === 'object' 
          ? JSON.stringify(error.response.data)
          : error.response.data;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter, sort, and search logic
  useEffect(() => {
    let filtered = [...orders];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((order) => order.type === typeFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const today = new Date();
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const todayCopy = new Date(today);
        
        switch (dateFilter) {
          case "today":
            return orderDate.toDateString() === todayCopy.toDateString();
          case "week": {
            const startOfWeek = new Date(
              todayCopy.getFullYear(),
              todayCopy.getMonth(),
              todayCopy.getDate() - todayCopy.getDay()
            );
            return orderDate >= startOfWeek;
          }
          case "month":
            return orderDate.getMonth() === todayCopy.getMonth();
          default:
            return true;
        }
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((order) =>
        [
          order._id,
          order.customerName,
          order.customerEmail,
          order.mobileNumber
        ].some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "totalAsc") return a.total - b.total;
      if (sortBy === "totalDesc") return b.total - a.total;
      return 0;
    });

    setFilteredOrders(filtered);
  }, [statusFilter, typeFilter, searchQuery, orders, sortBy, dateFilter]);

  // Handle status updates
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      let errorMessage = error.message;
      if (error.response?.data) {
        errorMessage = typeof error.response.data === 'object' 
          ? JSON.stringify(error.response.data)
          : error.response.data;
      }
      setError(errorMessage);
    } finally {
      setActionConfirmation(null);
    }
  };

  return (
    <div className="p-6 bg-[#1a1a1a] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t.manageOrders}</h1>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-[#D99904] rounded hover:bg-[#b37d00] transition-colors"
        >
          {language === "en" ? "عربي" : "English"}
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 flex-wrap">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded bg-[#3a3a3a] text-white flex-1 min-w-[200px]"
        >
          <option value="all">{t.allStatuses}</option>
          {["pending", "accepted", "completed", "canceled"].map((status) => (
            <option key={status} value={status}>
              {t[status]}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 rounded bg-[#3a3a3a] text-white flex-1 min-w-[200px]"
        >
          <option value="all">{t.allTypes}</option>
          {["pickup", "delivery", "dineIn"].map((type) => (
            <option key={type} value={type}>
              {t[type]}
            </option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 rounded bg-[#3a3a3a] text-white flex-1 min-w-[200px]"
        >
          <option value="all">{t.allDates}</option>
          {["today", "week", "month"].map((range) => (
            <option key={range} value={range}>
              {t[range]}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded bg-[#3a3a3a] text-white flex-1 min-w-[200px]"
        >
          <option value="newest">{t.newestFirst}</option>
          <option value="oldest">{t.oldestFirst}</option>
          <option value="totalAsc">{t.totalLowToHigh}</option>
          <option value="totalDesc">{t.totalHighToLow}</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="p-2 rounded bg-[#3a3a3a] text-white flex-grow min-w-[300px]"
        />
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
                <FaSpinner className="animate-spin text-4xl text-[#D99904]" />
              </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-800 text-white p-4 rounded mb-4">
          <div className="whitespace-pre-wrap">{error}</div>
          <button onClick={fetchOrders} className="mt-2 underline">
            {t.retry}
          </button>
        </div>
      )}

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedOrder(order)}
          >
            <div className={`${getStatusColor(order.status)} text-white text-center py-2 rounded mb-4`}>
              {t[order.status]}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">
                {t.orderId}: {order._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-400">
                {t.customer}: {order.customerName}
              </p>
              <p className="text-sm text-gray-400">
                {t.total}: ${order.total}
              </p>
              <p className="text-sm text-gray-400">
                {t.orderDate}: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              {order.status === "pending" && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionConfirmation({ orderId: order._id, action: "accepted" });
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                  >
                    {t.accept}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionConfirmation({ orderId: order._id, action: "canceled" });
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
                  >
                    {t.cancel}
                  </button>
                </>
              )}
              {order.status === "accepted" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActionConfirmation({ orderId: order._id, action: "completed" });
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                >
                  {t.complete}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-[#2c2c2c] p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#D99904] mb-4">{t.orderDetails}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">
                  {t.orderId}: {selectedOrder._id}
                </p>
                <p className="text-sm text-gray-400">
                  {t.customer}: {selectedOrder.customerName}
                </p>
                <p className="text-sm text-gray-400">
                  {t.email}: {selectedOrder.customerEmail}
                </p>
                <p className="text-sm text-gray-400">
                  {t.phone}: {selectedOrder.mobileNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {t.orderDate}: {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">
                  {t.paymentMethod}: {selectedOrder.paymentMethod}
                </p>
                <p className="text-sm text-gray-400">
                  {t.orderType}: {t[selectedOrder.type]}
                </p>
                {selectedOrder.type === "dineIn" && (
                  <p className="text-sm text-gray-400">
                    {t.numberOfPeople}: {selectedOrder.numberOfPeople}
                  </p>
                )}
              </div>
            </div>

            <div className="my-6">
              <h3 className="font-semibold mb-2">{t.items}</h3>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between border-b border-gray-600 py-2">
                  <div>
                  <p className="text-sm text-gray-400">
                  {language === "en" ? "Item Name" : "اسم العنصر"}:{" "}
                  <span className="font-medium text-white">
                    {language === "en" ? item.name.en : item.name.ar}
                  </span>
                </p>
                    <p className="text-sm text-gray-400">
                      {t.quantity}: {item.quantity}
                    </p>
                  </div>
                  <p>${item.price}</p>
                </div>
              ))}
              <div className="flex justify-between mt-4 font-semibold">
                <p>{t.total}:</p>
                <p>${selectedOrder.total}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded float-right hover:bg-gray-600"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {actionConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-[#2c2c2c] p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">{t.confirmAction}</h3>
            <p className="mb-4">
              {t.confirmActionMessage}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActionConfirmation(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => handleStatusUpdate(actionConfirmation.orderId, actionConfirmation.action)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;