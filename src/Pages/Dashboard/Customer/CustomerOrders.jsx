import { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "../../../AppContext/AppContext";
import { FaSpinner } from "react-icons/fa";

const CustomerOrders = () => {
  const { user, language } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders?userId=${user._id}`
        );
        setOrders(response.data.reverse()); // Reverse orders to show latest first
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
        <FaSpinner className="animate-spin text-4xl text-[#D99904]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#1a1a1a] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 text-[#D99904]">
        {language === "en" ? "Your Orders" : "طلباتك"}
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl">
            {language === "en"
              ? "You haven't placed any orders yet."
              : "لم تقم بوضع أي طلبات حتى الآن."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-[#2c2c2c] rounded-lg shadow-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {language === "en" ? "Order ID" : "رقم الطلب"}: 
                    <span className="text-[#D99904] ml-2">
                      {order._id.slice(-8).toUpperCase()}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString(
                      language === "en" ? "en-US" : "ar-SA",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : order.status === "completed"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-[#3a3a3a] p-3 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name[language]}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name[language]}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-gray-400">
                          {language === "en" ? "Quantity" : "الكمية"}: 
                          <span className="font-medium text-white ml-1">{item.quantity}</span>
                        </p>
                        <p className="text-[#D99904] font-medium">
                          SAR {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                <p className="text-lg font-semibold">
                  {language === "en" ? "Total" : "الإجمالي"}:
                </p>
                <p className="text-xl font-bold text-[#D99904]">
                  SAR {order.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
